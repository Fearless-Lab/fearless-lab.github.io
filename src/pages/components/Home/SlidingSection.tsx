import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollReveal } from "@animationHooks/useScrollReveal";

const companies = ["1", "2", "3", "4", "5", "6", "7"];

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

  useScrollReveal(containerRef);

  return (
    <div ref={containerRef} className="w-1/2 overflow-hidden p-20 m-auto">
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
