import { useEffect, useRef, useState } from "react";
import { PHASE } from "@constants/banPick";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";

interface BanPickTimerProps {
  matchId: string;
  startedAt: Date | null;
  currentStep: number | null;
}

const BanPickTimer = ({
  matchId,
  startedAt,
  currentStep,
}: BanPickTimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const { goToNextStep } = useBanPickController(matchId);
  const calledRef = useRef(false);
  const lastStepRef = useRef<number | null>(null);

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
        goToNextStep(currentStep);
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 100);

    return () => clearInterval(interval);
  }, [startedAt, currentStep, goToNextStep]);

  if (!startedAt || currentStep === null || currentStep >= PHASE.length)
    return <div className="text-xl font-bold">:00</div>;

  return <div className="text-xl font-bold">:{Math.ceil(remainingTime)}</div>;
};

export default BanPickTimer;
