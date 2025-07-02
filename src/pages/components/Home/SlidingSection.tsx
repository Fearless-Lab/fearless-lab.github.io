import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { companies } from "../../../../constants/navLinks";

const SlidingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const width = track.scrollWidth / 2;

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: 15,
          ease: "linear",
          repeat: -1,
        }
      );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          // 한 번 스크롤해서 애니메이션 시작하면 끝날 때까지 그대로 두고,
          // 뒤로 스크롤해도 애니메이션을 다시 역재생하거나 초기 상태로 돌리지 않음
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-1/2 overflow-hidden my-18 m-auto">
      <div ref={trackRef} className="flex whitespace-nowrap">
        {[...companies, ...companies].map((corp, i) => (
          <span key={i} className="text-white text-md font-semibold px-8">
            {corp}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlidingSection;
