import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
        className="flex flex-col items-center justify-center min-h-screen text-white p-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse at top, #1a3a5e 0%, #0a1f33 40%, #050d18 60%)",
          backgroundColor: "#050d18",
        }}
      >
        <p className="flex items-center text-sm text-blue-200 mb-4 px-4 py-2 rounded-full bg-gray-900 shadow-lg shadow-blue-500/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4 mr-1 text-blue-300"
          >
            <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
          </svg>
          의사결정의 혁신
        </p>

        <div className="mb-6">
          <p className="text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
            AI 기반 최적화 솔루션으로
            <br />
            비즈니스 효율성을 극대화하세요
          </p>
        </div>

        <div className="mb-8 max-w-2xl">
          <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
            맞춤형 AI 솔루션으로 다양한 산업의 의사결정을 최적화하고
            <br />
            비즈니스를 혁신하세요
          </p>
        </div>

        <button className="px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative">
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg"></span>{" "}
          지금 시작하기
        </button>
      </div>
    </>
  );
};

export default Hero;
