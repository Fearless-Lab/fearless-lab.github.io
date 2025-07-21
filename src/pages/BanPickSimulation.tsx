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

        {/* 밴 슬롯 -> 배열을 실제 밴 목록으로 교체해야 함*/}
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

        <div className="max-w-6xl mx-auto mt-4 w-full">
          {/* md 이상 그리드 레이아웃 */}
          <div className="hidden md:grid md:grid-cols-11 md:gap-4 max-w-6xl mx-auto mt-4 w-full">
            {/* 왼쪽 2칸 */}
            <div className="md:col-span-3 bg-blue-500 text-white p-4 rounded-md min-h-100">
              BLUE TEAM CHAMP
            </div>

            {/* 가운데 5칸 - flex-col로 세로배치 */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="bg-green-500 text-white p-4 rounded-md min-h-84 self-start">
                챔피언 선택 영역 챔피언 선택 영역 챔피언 선택 영역 챔피언 선택
                영역 챔피언 선택 영역 챔피언 선택 영역
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
                선택 완료
              </button>
            </div>

            {/* 오른쪽 2칸 */}
            <div className="md:col-span-3 bg-red-500 text-white p-4 rounded-md min-h-100">
              RED TEAM CHAMP
            </div>
          </div>

          {/* md 이하 레이아웃 */}
          <div className="flex flex-col md:hidden w-full gap-4">
            <div className="bg-green-500 text-white p-4 rounded-md min-h-96">
              챔피언 선택 영역
            </div>
            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white max-w-md mx-auto">
              선택 완료
            </button>
            <div className="flex w-full gap-4 items-start">
              <div className="bg-blue-500 text-white p-4 flex-1 rounded-md min-h-80">
                BLUE TEAM CHAMP
              </div>
              <div className="bg-red-500 text-white p-4 flex-1 rounded-md min-h-80">
                RED TEAM CHAMP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanPickSimulation;
