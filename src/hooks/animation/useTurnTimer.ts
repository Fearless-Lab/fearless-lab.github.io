import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface UseTurnTimerOptions {
  totalTime: number;
  isBlueTurn: boolean;
  barRef: React.RefObject<HTMLDivElement | null>;
}

export const useTurnTimer = ({
  totalTime,
  isBlueTurn,
  barRef,
}: UseTurnTimerOptions) => {
  useGSAP(
    () => {
      if (!barRef.current) return;

      gsap.killTweensOf(barRef.current);
      barRef.current.style.transformOrigin = "center";
      gsap.set(barRef.current, { scaleX: 1 });

      gsap.to(barRef.current, {
        scaleX: 0,
        duration: totalTime,
        ease: "linear",
      });
    },
    { dependencies: [isBlueTurn] }
  );
};
