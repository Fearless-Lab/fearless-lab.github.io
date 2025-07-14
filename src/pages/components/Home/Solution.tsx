import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import SubInfopill from "@commonComponents/SubInfopill";
import { useScrollReveal } from "@animationHooks/useScrollReveal";
import { useRef } from "react";
import SolutionDetail from "./Solution/SolutionDetail";

const Solution = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);

  return (
    <div
      className="flex flex-col items-center justify-center my-48 px-4 text-center flex-wrap"
      ref={containerRef}
    >
      <HighlightBadge>Lorem ipsum dolor</HighlightBadge>

      <Infopill>Consectetur adipiscing elit</Infopill>

      <SubInfopill>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        <br />
        laboris nisi ut aliquip ex ea commodo consequat.
      </SubInfopill>

      <SolutionDetail />
    </div>
  );
};

export default Solution;
