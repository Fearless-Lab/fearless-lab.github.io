interface BanAreaProps {
  myTeam: "blue" | "red" | undefined;
  localBan: string[];
  enemyBan: string[];
  version: string;
}

const BanArea = ({ myTeam, localBan, enemyBan, version }: BanAreaProps) => {
  const renderBans = (
    bans: string[],
    keyPrefix: string,
    team: "blue" | "red"
  ) =>
    bans.map((champ, i) => {
      const borderColor =
        team === "blue" ? "border-blue-400" : "border-red-400";
      const key = `${keyPrefix}-${i}`;
      const baseClass = `w-10 h-10 border ${borderColor} bg-neutral-900`;

      return champ ? (
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
          key={key}
          className={baseClass}
        />
      ) : (
        <div key={`${key}-empty`} className={baseClass} />
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
