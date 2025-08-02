interface PickColumnProps {
  team: "blue" | "red";
  picks: (string | undefined)[];
}

const PickColumn = ({ team, picks }: PickColumnProps) => {
  return (
    <>
      {picks.map((champion, i) => (
        <div
          key={`${team}-pick-${i}`}
          className="flex-1 relative"
          style={{
            backgroundImage: champion
              ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
              : undefined,
            backgroundSize: "cover",
          }}
        >
          {champion && (
            <div
              className={`absolute top-1 px-1 py-0.5 text-xs font-semibold text-white bg-black/70 rounded ${
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
