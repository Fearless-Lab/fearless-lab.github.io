import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HighlightBadge from "../../../components/HighlightBadge";
import Infopill from "../../../components/Infopill";
import SubInfopill from "../../../components/SubInfopill";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power1.out" }
    );
  }, []);

  return (
    <>
      <div
        ref={heroRef}
        className="flex flex-col items-center justify-center py-48 px-4 text-center flex-wrap"
        style={{
          background:
            "radial-gradient(ellipse at top, #1a3a5e 0%, #0a1f33 40%, #050d18 60%)",
          backgroundColor: "#050d18",
        }}
      >
        <HighlightBadge>의사결정의 혁신</HighlightBadge>

        <Infopill>
          AI 기반 최적화 솔루션으로
          <br />
          비즈니스 효율성을 극대화하세요
        </Infopill>

        <SubInfopill>
          맞춤형 AI 솔루션으로 다양한 산업의 의사결정을 최적화하고
          <br />
          비즈니스를 혁신하세요
        </SubInfopill>

        <button className="px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative">
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg"></span>{" "}
          지금 시작하기
        </button>
      </div>
    </>
  );
};

export default Hero;
