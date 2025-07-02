import { useRef } from "react";
import HighlightBadge from "../../../components/HighlightBadge";
import Infopill from "../../../components/Infopill";
import SubInfopill from "../../../components/SubInfopill";
import { useScrollReveal } from "../../../hooks/animation/useScrollReveal";

const Solution = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);

  return (
    <div
      className="flex flex-col items-center justify-center py-48 px-4 text-center flex-wrap"
      ref={containerRef}
    >
      <HighlightBadge>AI의 힘을 발견하세요</HighlightBadge>

      <Infopill>비즈니스 성장을 위한 AI 솔루션</Infopill>

      <SubInfopill>
        AI 솔루션을 확인하고, 사용자들의 의견을 듣고, 작동 방식을 직접
        확인하세요.
      </SubInfopill>

      {/* Solution Detail */}
    </div>
  );
};
export default Solution;
