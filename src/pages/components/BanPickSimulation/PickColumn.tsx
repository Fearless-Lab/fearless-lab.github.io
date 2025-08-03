import { PHASE } from "@constants/banPick";

interface PickColumnProps {
  team: "blue" | "red";
  picks: (string | undefined)[];
  currentStep: number;
}

const PickColumn = ({ team, picks, currentStep }: PickColumnProps) => {
  const currentPhase = PHASE[currentStep];
  const isCurrentTeam =
    currentPhase?.team === team && currentPhase?.type === "pick";
  const currentIndex = currentPhase?.index;

  const borderColorClass =
    team === "blue" ? "border-blue-400" : "border-rose-400";

  return (
    <>
      {picks.map((champion, i) => (
        <div
          key={`${team}-pick-${i}`}
          className={`flex-1 relative rounded-md ${
            isCurrentTeam && i === currentIndex
              ? `border-2 ${borderColorClass}`
              : ""
          }`}
          style={{
            backgroundImage: champion
              ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
              : undefined,
            backgroundSize: "cover",
          }}
        >
          {champion && (
            <div
              className={`absolute top-1 px-1 py-0.5 text-[9px] md:text-xs font-semibold text-white bg-black/70 rounded ${
                team === "blue" ? "left-1" : "right-1"
              }`}
            >
              {champion}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PickColumn;
