import CTAButton from "@/components/CTAButton";
import {
  ClipboardDocumentListIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import PositionRow from "./components/BanPickSimulation/PositionRow";
import { Input } from "@/components/ui/input";
import ChampionGrid from "./components/BanPickSimulation/ChampionGrid";
import ReadyCheckModal from "./components/BanPickSimulation/ReadyCheckModal";
import { useBanPickInit } from "@/hooks/banPick/useBanPickInit";

const TOTAL_TIME = 26;

const BanPickSimulation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL 쿼리 파라미터
  const matchId = searchParams.get("matchId") ?? "";
  const teamName = searchParams.get("teamName") ?? "";
  const mode = searchParams.get("mode") ?? "normal";
  const initialTeam = (searchParams.get("initialTeam") ?? "blue") as
    | "blue"
    | "red";

  // Firestore 관련 훅
  const { initializeDoc, subscribeToStart, markAsReady } = useBanPickInit({
    matchId,
    teamName,
    mode,
    initialTeam,
  });

  // 로컬 상태
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isBlueTurn, setIsBlueTurn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // 필수 파라미터 없으면 리다이렉트
  useEffect(() => {
    if (!matchId || !teamName) {
      navigate("/404");
    }
  }, [matchId, teamName, navigate]);

  // 컴포넌트 마운트 시 Firestore 문서 초기화
  useEffect(() => {
    if (!matchId || !teamName) return;

    initializeDoc().catch(console.error);
  }, [matchId, teamName, initializeDoc]);

  // Firestore 스냅샷 구독 -> 양 팀 준비 완료 시 모달 닫기
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToStart(() => {
      setIsModalOpen(false);
    });

    return () => unsubscribe();
  }, [matchId, subscribeToStart]);

  // 타이머 관리: 모달 닫혔을 때부터 동작
  useEffect(() => {
    if (isModalOpen) return;

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
  }, [isBlueTurn, isModalOpen]);

  // 준비 완료 버튼 클릭 핸들러
  const handleReady = async () => {
    if (isReady) return; // 중복 방지
    try {
      await markAsReady();
      setIsReady(true);
    } catch (e) {
      console.error(e);
      alert("준비 상태 갱신에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-20 md:mt-24">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 text-xs md:text-base">
        {/* 상단 바 */}
        <div className="flex w-full h-16 rounded-tl-md rounded-tr-md overflow-hidden">
          <div className="flex-1 bg-blue-400 text-white flex items-center justify-start font-bold pl-2">
            BLUE TEAM
          </div>
          <div className="w-20 bg-black text-white flex flex-col items-center justify-center font-mono font-semibold text-sm md:text-lg relative">
            <div className="text-2xl">
              :{timeLeft.toString().padStart(2, "0")}
            </div>
            <div className="mt-1 flex items-center gap-4">
              <ClipboardDocumentListIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <ArrowPathIcon className="w-5 h-5 cursor-pointer hover:text-red-800 text-rose-400" />
            </div>
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
          <div className="hidden md:grid md:grid-cols-4 gap-4 w-full">
            <div className="md:col-span-1 border min-h-92 flex flex-col divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1" />
              ))}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 px-4">
              <div className="px-4 py-2">
                <div className="flex items-center justify-between gap-2">
                  <PositionRow />
                  <Input
                    type="text"
                    placeholder="챔피언 검색"
                    className="w-36 rounded-none border border-gray-300"
                  />
                </div>
              </div>

              <div className="h-80 overflow-auto">
                <ChampionGrid />
              </div>

              <CTAButton>선택 완료</CTAButton>
            </div>

            <div className="md:col-span-1 border min-h-92 flex flex-col divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1" />
              ))}
            </div>
          </div>

          {/* md 이하 레이아웃 */}
          <div className="flex flex-col md:hidden gap-4 w-[90%] mx-auto">
            <div className="px-4 py-2 flex flex-col items-center">
              <PositionRow />
              <Input
                type="text"
                placeholder="챔피언 검색"
                className="w-40 rounded-none border border-gray-300 mt-4"
              />
            </div>

            <div className="min-h-84">
              <div className="h-80 overflow-auto">
                <ChampionGrid />
              </div>
            </div>
            <CTAButton>선택 완료</CTAButton>

            <div className="flex w-[75%] gap-4 mx-auto">
              <div className="flex-1 border border-blue-400 min-h-84 flex flex-col divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-1" />
                ))}
              </div>

              <div className="flex-1 border border-rose-400 min-h-84 flex flex-col divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReadyCheckModal
        open={isModalOpen}
        onReadyClick={handleReady}
        isReady={isReady}
      />
    </div>
  );
};

export default BanPickSimulation;
