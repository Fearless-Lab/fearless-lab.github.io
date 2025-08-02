import type { Champion } from "@/utils/generateRandomNickname";
import { PHASE } from "@constants/banPick";

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
}: ChampionGridProps) {
  let isMyTurn = undefined;
  if (currentStep < 20) isMyTurn = myTeam === PHASE[currentStep].team;

  const onChampionClick = (champ: string) => {
    if (!isMyTurn || currentSetSelections.has(champ)) return;

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
  };

  const filteredChampions = searchTerm
    ? champions.filter((champ) =>
        champ.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : champions;

  return (
    <div
      className="grid justify-center auto-rows-[64px] grid-flow-row gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, 64px)" }}
    >
      {filteredChampions.map((champ) => {
        const isDisabled =
          currentSetSelections.has(champ.id) || previousPicks.has(champ.id);

        const currentPhaseType = PHASE[currentStep]?.type;
        const currentPhaseIdx = PHASE[currentStep]?.index;

        // 지금 단계에서 선택된 챔피언인지
        const isSelected =
          (currentPhaseType === "ban" &&
            localBan[currentPhaseIdx] === champ.id) ||
          (currentPhaseType === "pick" &&
            localPick[currentPhaseIdx] === champ.id);

        return (
          <div
            key={champ.id}
            onClick={() => {
              if (!isDisabled) onChampionClick(champ.id);
            }}
            className={`w-16 flex flex-col items-center cursor-pointer ${
              isDisabled
                ? "pointer-events-none opacity-90"
                : isSelected
                ? "border-2 border-yellow-400 rounded-md"
                : "hover:border hover:border-white rounded-md"
            }`}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
              alt={champ.name}
              className={`w-16 h-16 object-cover ${
                isDisabled ? "grayscale" : ""
              }`}
            />
            <div className="text-[9px] text-center w-full">{champ.name}</div>
          </div>
        );
      })}
    </div>
  );
}
