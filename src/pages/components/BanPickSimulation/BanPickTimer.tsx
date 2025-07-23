import { useEffect, useState } from "react";
import { PHASE } from "@constants/banPick";

interface BanPickTimerProps {
  startedAt: Date | null;
  currentStep: number | null;
}

const BanPickTimer = ({ startedAt, currentStep }: BanPickTimerProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (!startedAt || currentStep === null || currentStep >= PHASE.length)
      return;

    const updateRemaining = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt.getTime()) / 1000);

      const phaseOffset = PHASE.slice(0, currentStep).reduce(
        (acc, cur) => acc + cur.duration,
        0
      );

      const currentPhase = PHASE[currentStep];
      const remaining = Math.max(
        currentPhase.duration - (elapsed - phaseOffset),
        0
      );

      setRemainingTime(remaining);
    };

    updateRemaining(); // mount 시 초기 계산
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [startedAt, currentStep]);

  if (!startedAt || currentStep === null || currentStep >= PHASE.length)
    return null;

  return <div className="text-xs md:text-lg font-bold">:{remainingTime}</div>;
};

export default BanPickTimer;
