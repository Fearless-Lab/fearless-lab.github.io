import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLocation } from "react-router-dom";

const LottieAnimations = () => {
  const location = useLocation();
  console.log(location.pathname);
  if (location.pathname === "/banPickSimulation") return null;

  return (
    <>
      <div
        className="hidden xl:block fixed top-[80px] right-0 w-[250px] h-[250px] z-10"
        data-skip-prerender
      >
        <DotLottieReact
          src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
          loop
          autoplay
        />
      </div>

      <div
        className="hidden xl:block fixed bottom-[50px] left-0 w-[250px] h-[250px] z-10 scale-x-[-1]"
        data-skip-prerender
      >
        <DotLottieReact
          src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
          loop
          autoplay
        />
      </div>
    </>
  );
};
export default LottieAnimations;
