import { useEffect, useRef, useState } from "react";
import { PHASE } from "@constants/banPick";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import type { Champion } from "@/utils/generateRandomNickname";

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
}

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
}: BanPickTimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const { commitAndAdvance, goToNextStep, commitTotalPickIfNeeded } =
    useBanPickController(matchId);
  const calledRef = useRef(false);
  const lastStepRef = useRef<number | null>(null);

  const getRandomSelectableChampion = () => {
    const bannedOrPicked = new Set([...currentSetSelections, ...previousPicks]);

    const selectableChampions = champions
      .map((c) => c.id)
      .filter((champId) => !bannedOrPicked.has(champId));

    // 랜덤으로 하나 뽑기
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
      const now = Date.now();
      const elapsed = (now - startedAt.getTime()) / 1000;

      const currentPhase = PHASE[currentStep];
      const remaining = Math.max(currentPhase.duration - elapsed, 0);

      setRemainingTime(Math.ceil(remaining));

      if (remaining <= 0.1 && !calledRef.current) {
        calledRef.current = true;
        const randomPick = getRandomSelectableChampion();

        if (isMyTurn) {
          commitAndAdvance(
            teamName,
            randomPick,
            PHASE[currentStep].type as "pick" | "ban",
            currentStep
          );
        }

        if (isSwapPhase) {
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
    return <div className="text-xl font-bold">:0</div>;

  return <div className="text-xl font-bold">:{Math.ceil(remainingTime)}</div>;
};

export default BanPickTimer;
