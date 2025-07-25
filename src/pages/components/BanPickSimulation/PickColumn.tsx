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
          className="flex-1"
          style={{
            backgroundImage: champion
              ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
              : undefined,
            backgroundSize: "cover",
          }}
        />
      ))}
    </>
  );
};

export default PickColumn;
