import { useEffect, useRef, useState } from "react";
import { PHASE } from "@constants/banPick";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import type { Champion } from "@/utils/generateRandomNickname";
import { getServerNow } from "@/utils/serverTime";

interface BanPickTimerProps {
  matchId: string;
  startedAt: Date | null;
  currentStep: number | null;
  currentSetSelections: Set<string>;
  previousPicks: Set<string>;
  champions: Champion[];
  teamName: string;
  isMyTurn: Boolean;
  isSwapPhase: Boolean;
  isGuest: Boolean;
}

const EXTRA_DELAY = 2.5; // 0초 이후 추가 대기 시간

const BanPickTimer = ({
  matchId,
  startedAt,
  currentStep,
  currentSetSelections,
  previousPicks,
  champions,
  teamName,
  isMyTurn,
  isSwapPhase,
  isGuest,
}: BanPickTimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const {
    commitAndAdvance,
    goToNextStep,
    commitTotalPickIfNeeded,
    commitSwapConfirm,
  } = useBanPickController(matchId);

  const calledRef = useRef(false);
  const lastStepRef = useRef<number | null>(null);

  const getRandomSelectableChampion = () => {
    const bannedOrPicked = new Set([...currentSetSelections, ...previousPicks]);
    const selectableChampions = champions
      .map((c) => c.id)
      .filter((champId) => !bannedOrPicked.has(champId));

    const randomIndex = Math.floor(Math.random() * selectableChampions.length);
    return selectableChampions[randomIndex];
  };

  useEffect(() => {
    if (!startedAt || currentStep === null || currentStep >= PHASE.length)
      return;

    // 하나의 클라이언트에서 중복 호출 막기 위한 로직
    // 다른 클라이언트 간 중복 호출 방지는 Firebase 측 코드에서 수행
    if (lastStepRef.current !== currentStep) {
      calledRef.current = false;
      lastStepRef.current = currentStep;
    }

    const updateRemaining = () => {
      const elapsed = (getServerNow() - startedAt.getTime()) / 1000;

      const currentPhase = PHASE[currentStep];

      // 실제 로직 실행용: EXTRA_DELAY 포함
      const actualRemaining = Math.max(
        currentPhase.duration + EXTRA_DELAY - elapsed,
        0
      );

      // 화면 표시용: EXTRA_DELAY 제외
      const displayRemaining = Math.max(currentPhase.duration - elapsed, 0);

      setRemainingTime(Math.round(displayRemaining));

      if (isGuest) return;

      // 실행 조건은 EXTRA_DELAY 포함
      if (actualRemaining <= 0.1 && !calledRef.current) {
        calledRef.current = true;

        if (isMyTurn) {
          const randomPick = getRandomSelectableChampion();
          if (PHASE[currentStep].type === "ban") {
            commitAndAdvance(teamName, "", "ban", currentStep);
          } else {
            commitAndAdvance(teamName, randomPick, "pick", currentStep);
          }
        }

        if (isSwapPhase) {
          commitSwapConfirm(teamName);
          commitTotalPickIfNeeded(teamName);
          goToNextStep(currentStep);
        }
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 100);
    return () => clearInterval(interval);
  }, [startedAt, currentStep]);

  if (!startedAt || currentStep === null || currentStep >= PHASE.length)
    return <div className="text-xl font-bold">--</div>;

  return (
    <div
      key={remainingTime}
      className={`text-3xl font-bold transition-all duration-300 ${
        remainingTime <= 3
          ? "text-red-500 animate-pop"
          : remainingTime <= 5
          ? "text-yellow-500 animate-pop"
          : "text-white"
      }`}
    >
      {Math.round(remainingTime)}
    </div>
  );
};

export default BanPickTimer;
