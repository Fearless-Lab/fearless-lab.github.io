import CTAButton from "@/components/CTAButton";
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
    <div className="min-h-screen flex flex-col mt-20 md:mt-24">
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
                className="w-10 h-10 border border-blue-400 bg-neutral-900"
              />
            ))}
          </div>
          <div className="flex gap-2 flex-wrap ml-auto justify-end">
            {[...Array(5)].map((_, i) => (
              <div
                key={`red-ban-${i}`}
                className="w-10 h-10 border border-red-400 bg-neutral-900"
              />
            ))}
          </div>
        </div>

        {/* main section */}
        <div className="max-w-6xl mx-auto mt-4 w-full">
          {/* md 이상 레이아웃 */}
          <div className="hidden md:grid md:grid-cols-9 md:gap-10 w-full">
            {/* 왼쪽 챔피언 목록 */}
            <div className="md:col-span-2 border min-h-92 flex flex-col divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1" />
              ))}
            </div>

            {/* 가운데 선택 영역 */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <div className="border p-4">포지션 선택 필터, 검색창</div>
              <div className="border p-4 min-h-80 self-start">
                <div className="text-sm font-semibold mb-2">
                  챔피언 선택 영역 챔피언 선택 영역 챔피언 선택 영역 챔피언 선택
                  영역 챔피언 선택 영역 챔피언 선택 영역
                </div>
              </div>
              <CTAButton>선택 완료</CTAButton>
            </div>
            {/* 오른쪽 챔피언 목록 */}
            <div className="md:col-span-2 border min-h-92 flex flex-col divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1" />
              ))}
            </div>
          </div>

          {/* md 이하 레이아웃 */}
          <div className="flex flex-col md:hidden gap-4 w-[90%] mx-auto">
            <div className="border p-4">포지션 선택 필터, 검색창</div>
            <div className="border p-4 min-h-84">
              <div className="text-sm font-semibold mb-2">챔피언 선택 영역</div>
            </div>
            <CTAButton>선택 완료</CTAButton>
            <div className="flex w-[90%] gap-4 justify-evenly mx-auto">
              {/* 왼쪽 챔피언 목록 */}
              <div className="flex-1 border min-h-84 flex flex-col divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-1" />
                ))}
              </div>

              {/* 오른쪽 챔피언 목록 */}
              <div className="flex-1 border min-h-84 flex flex-col divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanPickSimulation;
