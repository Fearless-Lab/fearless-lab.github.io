import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

interface Options {
  y?: number;
  opacity?: number;
  duration?: number;
  ease?: string;
  start?: string;
  delay?: number;
}

export const useScrollReveal = (
  ref: RefObject<HTMLElement | null>,
  options: Options = {}
) => {
  const {
    y = 30,
    opacity = 0,
    duration = 2,
    ease = "power3.out",
    start = "top 80%",
    delay = 0,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y,
        opacity,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );
};
