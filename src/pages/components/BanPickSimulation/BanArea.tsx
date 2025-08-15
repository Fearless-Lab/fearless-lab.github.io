import { PHASE } from "@constants/banPick";

interface BanAreaProps {
  myTeam: "blue" | "red" | undefined;
  localBan: string[];
  enemyBan: string[];
  version: string;
  currentStep: number;
  isModalOpen: boolean;
}

const BanArea = ({
  myTeam,
  localBan,
  enemyBan,
  version,
  currentStep,
  isModalOpen,
}: BanAreaProps) => {
  const currentPhase = PHASE[currentStep];
  const isBanPhase = currentPhase?.type === "ban";
  const currentBanTeam = currentPhase?.team;
  const currentBanIndex = currentPhase?.index;

  const renderBans = (
    bans: string[],
    keyPrefix: string,
    team: "blue" | "red"
  ) =>
    bans.map((champ, i) => {
      const borderColor =
        team === "blue" ? "border-blue-400" : "border-rose-400";

      const logicalIndex = team === "red" ? bans.length - 1 - i : i;

      const isHighlight =
        !isModalOpen &&
        isBanPhase &&
        currentBanTeam === team &&
        currentBanIndex === logicalIndex;

      const key = `${keyPrefix}-${i}`;
      const baseClass = `relative w-10 h-10 border ${borderColor} bg-neutral-900 rounded-md overflow-hidden ${
        isHighlight ? "animate-border-ripple" : ""
      }`;

      const rippleColor =
        team === "blue" ? "rgba(96, 165, 250, 0.9)" : "rgba(244, 63, 94, 0.9)";

      return (
        <div
          key={key}
          className={baseClass}
          style={{ "--ripple-color": rippleColor } as React.CSSProperties}
        >
          {champ && (
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
              alt={champ}
              title={champ}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className={`absolute w-[70%] h-[1.2px] rotate-45 top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 pointer-events-none 
                        ${champ ? "bg-white" : "bg-white/30"}`}
          />
        </div>
      );
    });

  const blueBans =
    myTeam === "blue"
      ? renderBans(localBan, "blue-ban", "blue")
      : renderBans(enemyBan, "blue-ban", "blue");

  const redBans =
    myTeam === "red"
      ? renderBans([...localBan].reverse(), "red-ban", "red")
      : renderBans([...enemyBan].reverse(), "red-ban", "red");

  return (
    <>
      <div className="flex gap-2 flex-wrap">{blueBans}</div>
      <div className="flex gap-2 flex-wrap ml-auto justify-end">{redBans}</div>
    </>
  );
};

export default BanArea;
