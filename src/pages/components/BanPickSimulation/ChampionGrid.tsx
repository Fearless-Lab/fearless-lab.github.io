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
}: ChampionGridProps) {
  const isMyTurn = myTeam === PHASE[currentStep].team;

  const onChampionClick = (champ: string) => {
    if (!isMyTurn) return;

    console.log(champ);

    // 중복 로직 추가

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
      {filteredChampions.map((champ) => (
        <div
          key={champ.id}
          onClick={() => onChampionClick(champ.id)}
          className="w-16 flex flex-col items-center cursor-pointer"
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
            alt={champ.name}
            className="w-16 h-16 object-cover"
          />
          <div className="text-[9px] text-center w-full">{champ.name}</div>
        </div>
      ))}
    </div>
  );
}
