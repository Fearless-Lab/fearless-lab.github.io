import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import SubInfopill from "@commonComponents/SubInfopill";

const Hero = () => {
  return (
    <>
      <section
        id="main"
        className="flex flex-col items-center justify-center py-48 px-4 text-center flex-wrap"
        style={{
          background:
            "radial-gradient(ellipse at top, #1a3a5e 0%, #0a1f33 40%, #050d18 60%)",
          backgroundColor: "#050d18",
        }}
      >
        <HighlightBadge>LOL Ban · Pick Simulation</HighlightBadge>

        <Infopill>
          실전과 유사한 환경에서
          <br />
          밴픽 전략을 연습할 수 있는 도구입니다.
        </Infopill>

        <SubInfopill>
          팀원과 함께 참여하여 밴과 픽 과정을 실시간으로 시뮬레이션하고,
          <br />
          전략 수립 및 팀 커뮤니케이션을 효율적으로 연습해보세요.
        </SubInfopill>

        <button className="px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative">
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg"></span>{" "}
          시작하기
        </button>
      </section>
    </>
  );
};

export default Hero;
