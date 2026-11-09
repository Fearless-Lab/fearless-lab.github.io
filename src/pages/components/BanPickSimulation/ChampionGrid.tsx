import type { Champion } from "@/utils/generateRandomNickname";
import { preloadSplash } from "@/utils/preload";
import { LIVE_PREVIEW_ENABLED, PHASE } from "@constants/banPick";
import type { RefObject } from "react";

export interface ChampionGridProps {
  searchTerm: string;
  champions: Champion[];
  version: string;
  currentStep: number;
  myTeam: "blue" | "red" | undefined;
  localBan: string[];
  localPick: string[];
  setLocalBan: (value: string[]) => void;
  setLocalPick: (value: string[]) => void;
  currentSetSelections: Set<string>;
  previousPicks: Set<string>;
  mode: string;
  oppoPreviousPicks: Set<string>;
  isGuest: boolean;
  onPreview: (champ: string) => void;
  lockedStepRef: RefObject<number | null>;
}

export default function ChampionGrid({
  searchTerm,
  champions,
  version,
  currentStep,
  myTeam,
  localBan,
  localPick,
  setLocalBan,
  setLocalPick,
  currentSetSelections,
  previousPicks,
  mode,
  oppoPreviousPicks,
  isGuest,
  onPreview,
  lockedStepRef,
}: ChampionGridProps) {
  let isMyTurn = undefined;
  if (currentStep < 20) isMyTurn = myTeam === PHASE[currentStep].team;

  const onChampionClick = (champ: string) => {
    if (!isMyTurn || currentSetSelections.has(champ) || isGuest) return;

    // 확정 요청이 처리되는 동안 다른 챔피언이 화면에 노출되지 않도록 막음
    if (LIVE_PREVIEW_ENABLED && lockedStepRef.current === currentStep) return;

    const currentPhaseType = PHASE[currentStep].type;
    const currentPhaseIdx = PHASE[currentStep].index;

    if (currentPhaseType === "ban") {
      const temp = [...localBan];
      temp[currentPhaseIdx] = champ;
      setLocalBan([...temp]);
    } else if (currentPhaseType === "pick") {
      const temp = [...localPick];
      temp[currentPhaseIdx] = champ;
      setLocalPick([...temp]);
    }

    onPreview(champ);
  };

  const filteredChampions = searchTerm
    ? champions.filter((champ) => champ.name.includes(searchTerm.trim()))
    : champions;

  return (
    <div
      className="grid justify-center auto-rows-[64px] grid-flow-row gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fit, 64px)" }}
    >
      {filteredChampions.map((champ) => {
        const currentPhaseType = PHASE[currentStep]?.type;
        const currentPhaseIdx = PHASE[currentStep]?.index;

        const baseCheck = currentSetSelections.has(champ.id);

        let banCheck = false;
        if (mode === "hardFearless") {
          banCheck = previousPicks.has(champ.id);
        } else if (mode === "fearless") {
          banCheck = oppoPreviousPicks.has(champ.id);
        }

        const pickCheck =
          mode === "hardFearless" || mode === "fearless"
            ? previousPicks.has(champ.id)
            : false;

        let isDisabled =
          currentPhaseType === "ban"
            ? baseCheck || banCheck
            : baseCheck || pickCheck;

        if (mode === "fearless" && isGuest) isDisabled = true;

        const isSelected =
          !isGuest &&
          ((currentPhaseType === "ban" &&
            localBan[currentPhaseIdx] === champ.id) ||
            (currentPhaseType === "pick" &&
              localPick[currentPhaseIdx] === champ.id));

        return (
          <div
            key={champ.id}
            onMouseEnter={() => preloadSplash(champ.id)}
            onClick={() => {
              if (!isDisabled) onChampionClick(champ.id);
            }}
            className={`w-16 flex flex-col items-center ${
              isDisabled
                ? "cursor-not-allowed opacity-90"
                : isSelected
                ? "cursor-pointer border-2 border-yellow-400 rounded-md"
                : "cursor-pointer hover:border hover:border-white rounded-md"
            }`}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
              alt={champ.name}
              className={`w-16 h-16 object-cover ${
                isDisabled ? "grayscale" : ""
              }`}
            />
            <div className="text-[8px] text-center w-full">{champ.name}</div>
          </div>
        );
      })}
    </div>
  );
}
