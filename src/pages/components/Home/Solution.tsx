import { useRef } from "react";
import HighlightBadge from "../../../components/HighlightBadge";
import Infopill from "../../../components/Infopill";
import SubInfopill from "../../../components/SubInfopill";
import { useScrollReveal } from "../../../hooks/animation/useScrollReveal";
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
