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
      <title>롤 모의 밴픽 | Fearless</title>
      <meta
        name="description"
        content="Fearless는 리그오브레전드(LoL) 모의 밴픽 시뮬레이터입니다. 실전 같은 환경에서 팀 전략을 연습하고, 챔피언 밴픽 타이머, 세트 기록, 스왑 기능을 통해 대회 준비와 스크림 훈련을 효율적으로 진행하세요."
      />
      <meta
        name="keywords"
        content="롤 모의 밴픽, 모의 밴픽, 피어리스 밴픽, 롤 밴픽 시뮬레이터, LoL 밴픽, 리그오브레전드 밴픽, 밴픽 시뮬레이션, 밴픽 사이트, 롤 밴픽 사이트, 모의 밴픽, 팀 전략, 게임 전략, 챔피언 선택, banpick, ban pick simulator, 롤 대회 준비, 스크림 도구, 피어리스 룰, fearless"
      />
      <link rel="canonical" href="https://fearless-lab.github.io/" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="롤 모의 밴픽 시뮬레이터 - Fearless" />
      <meta
        property="og:description"
        content="실전 같은 환경에서 팀 전략을 연습하고, 대회 준비와 스크림 훈련을 효율적으로 진행하세요."
      />
      <meta
        property="og:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />
      <meta property="og:url" content="https://fearless-lab.github.io/" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="롤 모의 밴픽 시뮬레이터 - Fearless" />
      <meta
        name="twitter:description"
        content="실전 같은 환경에서 팀 전략을 연습하고, 대회 준비와 스크림 훈련을 효율적으로 진행하세요."
      />
      <meta
        name="twitter:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />

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
