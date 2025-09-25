import CTAButton from "@/components/CTAButton";
import { useScrollReveal } from "@/hooks/animation/useScrollReveal";
import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import SubInfopill from "@commonComponents/SubInfopill";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useScrollReveal(sectionRef);

  return (
    <>
      <section
        id="main"
        ref={sectionRef}
        className="flex flex-col items-center justify-center px-4 text-center flex-grow pt-50"
      >
        <HighlightBadge>롤 모의 밴픽 시뮬레이터</HighlightBadge>

        <Infopill>
          실전과 유사한 환경에서
          <br />
          밴픽을 연습할 수 있는 도구입니다.
        </Infopill>

        <SubInfopill>
          팀원과 함께 참여하여 <strong>모의 밴픽</strong> 과정을 실시간으로
          시뮬레이션하고,
          <br />
          전략 수립 및 팀 커뮤니케이션을 효율적으로 연습해보세요.
        </SubInfopill>

        <CTAButton onClick={() => navigate("./banPick")}>시작하기</CTAButton>
      </section>
    </>
  );
};

export default Home;
