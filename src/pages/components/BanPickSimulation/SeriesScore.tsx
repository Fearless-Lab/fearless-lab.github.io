interface SeriesScoreProps {
  wins: number;
  bestOf: number;
}

export const SeriesScore = ({ wins, bestOf }: SeriesScoreProps) => {
  const visibleBoxes = Math.ceil(bestOf / 2);
  const boxes = Array.from({ length: visibleBoxes });
  const reversed = [...boxes].reverse();

  return (
    <div className="flex flex-col justify-center items-center h-full py-1 w-8 gap-[3px]">
      {reversed.map((_, revIndex) => {
        const indexFromBottom = visibleBoxes - revIndex - 1;
        const isFilled = indexFromBottom < wins;

        return (
          <div
            key={revIndex}
            className={`w-full h-[25%] border transition-all duration-300 ${
              isFilled
                ? "border-white bg-gradient-to-b from-white via-zinc-100 to-zinc-200 shadow-[0_0_6px_rgba(255,255,255,0.55)]"
                : "border-white/40 bg-zinc-400/30"
            }`}
          />
        );
      })}
    </div>
  );
};
