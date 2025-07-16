import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export const useSplitTextAnimation = () => {
  const elRef = useRef(null);

  useGSAP(() => {
    let split: SplitText | null = null;

    const runAnimation = async () => {
      // 웹폰트 로딩 대기
      await document.fonts.ready;

      if (!elRef.current) return;

      split = SplitText.create(elRef.current, {
        type: "lines",
        linesClass: "lineChild",
      });

      gsap.from(split.lines, {
        duration: 1,
        y: 30,
        autoAlpha: 0,
        stagger: 0.15,
        ease: "power2.out",
      });
    };

    runAnimation();

    return () => {
      split?.revert();
    };
  }, []);

  return elRef;
};
