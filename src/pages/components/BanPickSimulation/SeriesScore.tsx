interface SeriesScoreProps {
  wins: number;
  bestOf: number;
}

export const SeriesScore = ({ wins, bestOf }: SeriesScoreProps) => {
  const totalBoxes = 3;
  const visibleBoxes = Math.ceil(bestOf / 2);
  const boxes = Array.from({ length: visibleBoxes });

  return (
    <div className="flex flex-col justify-center items-center h-full py-1 w-8 gap-[2px]">
      {boxes.map((_, i) => {
        const isFilled = i < wins;
        return (
          <div
            key={i}
            style={{ height: `${100 / totalBoxes}%` }}
            className={`w-full border border-gray-600 transition-all duration-200 ${
              isFilled
                ? "bg-gradient-to-t from-yellow-400 via-orange-400 to-amber-500 shadow-[0_0_6px_rgba(255,200,0,0.6)]"
                : "bg-neutral-800/70"
            }`}
          />
        );
      })}
    </div>
  );
};
