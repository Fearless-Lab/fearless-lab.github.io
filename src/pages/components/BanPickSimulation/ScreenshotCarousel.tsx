import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const screenshots = [
  "/screenshots/sim-1.png",
  "/screenshots/sim-2.png",
  "/screenshots/sim-3.png",
  "/screenshots/sim-4.png",
  "/screenshots/sim-5.png",
];

const ScreenshotCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSlide = (dir: "prev" | "next") => {
    setIndex((prev) => {
      if (dir === "next") return (prev + 1) % screenshots.length;
      else return (prev - 1 + screenshots.length) % screenshots.length;
    });
  };

  return (
    <div className="relative w-full max-w-3xl h-72 flex items-center justify-center overflow-hidden mt-8">
      <div className="flex items-center justify-center w-full h-full relative">
        {screenshots.map((src, i) => {
          const diff = (i - index + screenshots.length) % screenshots.length;

          let className =
            "absolute w-80 h-44 rounded-lg shadow-lg transition-all duration-500 overflow-hidden";
          let style: React.CSSProperties = {};
          let pointer: React.CSSProperties["pointerEvents"] = "none";

          if (diff === 0) {
            // Center
            className += " scale-160 opacity-100 z-20 cursor-pointer";
            style = { transform: "translateX(0%)" };
            pointer = "auto";
          } else if (diff === 1) {
            // Right
            className += " scale-75 opacity-30 z-10";
            style = { transform: "translateX(120%)" };
          } else if (diff === screenshots.length - 1) {
            // Left
            className += " scale-75 opacity-30 z-10";
            style = { transform: "translateX(-120%)" };
          } else {
            // Others (hidden)
            className += " scale-75 opacity-0 z-0";
          }

          return (
            <div
              key={i}
              className={className}
              style={{ ...style, pointerEvents: pointer }}
              onClick={() => {
                if (diff === 0) window.open(src, "_blank");
              }}
            >
              <img
                src={src}
                alt={`screenshot-${i + 1}`}
                className="w-full h-full object-contain bg-black"
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleSlide("prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ArrowLeftIcon className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={() => handleSlide("next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default ScreenshotCarousel;
