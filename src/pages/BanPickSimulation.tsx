import { useEffect, useState } from "react";

const TOTAL_TIME = 26;

const BanPickSimulation = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isBlueTurn, setIsBlueTurn] = useState(true);

  useEffect(() => {
    setTimeLeft(TOTAL_TIME);

    let timeoutId: NodeJS.Timeout;

    const tick = (remaining: number) => {
      if (remaining <= 0) {
        setIsBlueTurn((prev) => !prev);
        setTimeLeft(0);
        return;
      }
      setTimeLeft(remaining);
      timeoutId = setTimeout(() => tick(remaining - 1), 1000);
    };

    tick(TOTAL_TIME);

    return () => clearTimeout(timeoutId);
  }, [isBlueTurn]);

  return (
    <div className="min-h-screen flex flex-col mt-24">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 text-xs md:text-base">
        {/* 상단 바 */}
        <div className="flex w-full h-16 rounded-tl-md rounded-tr-md overflow-hidden">
          <div className="flex-1 bg-blue-400 text-white flex items-center justify-start font-bold pl-2">
            BLUE TEAM
          </div>
          <div className="w-20 bg-black text-white flex items-center justify-center font-mono font-semibold text-sm md:text-lg">
            :{timeLeft.toString().padStart(2, "0")}
          </div>
          <div className="flex-1 bg-red-400 text-white flex items-center justify-end font-bold pr-2">
            RED TEAM
          </div>
        </div>

        {/* 밴 슬롯 */}
        <div className="flex justify-between items-center py-2">
          <div className="flex gap-2 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div
                key={`blue-ban-${i}`}
                className="w-10 h-10 border border-blue-400 bg-neutral-900 rounded-sm"
              />
            ))}
          </div>
          <div className="flex gap-2 flex-wrap ml-auto justify-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={`red-ban-${i}`}
                className="w-10 h-10 border border-red-400 bg-neutral-900 rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanPickSimulation;
