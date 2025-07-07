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
        <HighlightBadge>Lorem ipsum dolor</HighlightBadge>

        <Infopill>
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit
        </Infopill>

        <SubInfopill>
          Ut enim ad minim veniam, quis nostrud exercitation
          <br />
          ullamco laboris nisi ut aliquip ex ea commodo
        </SubInfopill>

        <button className="px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative">
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg"></span>{" "}
          시작하기
        </button>
      </div>
    </>
  );
};

export default Hero;
