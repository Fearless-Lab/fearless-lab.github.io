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

      // 빨강팀은 reverse 순서라 인덱스 보정
      const logicalIndex = team === "red" ? bans.length - 1 - i : i;

      const isHighlight =
        !isModalOpen &&
        isBanPhase &&
        currentBanTeam === team &&
        currentBanIndex === logicalIndex;

      const key = `${keyPrefix}-${i}`;
      const baseClass = `w-10 h-10 border ${borderColor} bg-neutral-900 rounded-md ${
        isHighlight ? "animate-border-ripple" : ""
      }`;

      const rippleColor =
        team === "blue" ? "rgba(96, 165, 250, 0.9)" : "rgba(244, 63, 94, 0.9)";

      return champ ? (
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
          key={key}
          alt={champ}
          className={baseClass}
          title={champ}
          style={{ "--ripple-color": rippleColor } as React.CSSProperties}
        />
      ) : (
        <div
          key={`${key}-empty`}
          className={baseClass}
          style={{ "--ripple-color": rippleColor } as React.CSSProperties}
        />
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
