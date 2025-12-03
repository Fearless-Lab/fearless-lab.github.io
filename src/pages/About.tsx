import { useScrollReveal } from "@/hooks/animation/useScrollReveal";
import {
  UsersIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  EnvelopeIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import ScreenshotCarousel from "./components/BanPickSimulation/ScreenshotCarousel";

const About = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useScrollReveal(divRef);

  return (
    <>
      <title>모의 밴픽 | Fearless</title>
      <meta
        name="description"
        content="Fearless는 스크림, 대회 준비, 밴픽 중계를 위한 리그오브레전드 모의 밴픽 도구입니다. 피어리스 룰을 지원하며 챔피언 부족 문제를 해결합니다."
      />
      <meta
        name="keywords"
        content="모의 밴픽, 피어리스 밴픽, Fearless 소개, 롤 스크림, 대회 준비, 밴픽 중계, 피어리스 룰, 롤 시뮬레이터, 롤 밴픽 도구"
      />
      <link rel="canonical" href="https://fearless-lab.github.io/about" />

      <div
        className="flex flex-col items-center justify-center px-6 py-32 text-white"
        ref={divRef}
      >
        <section className="max-w-4xl w-full mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Who's This For?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="group relative bg-gradient-to-br from-sky-500/10 to-cyan-500/5 border border-sky-400/20 rounded-2xl p-6 hover:border-sky-400/40 transition-all hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-sky-400/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <UsersIcon className="w-7 h-7 text-sky-400" />
              </div>
              <div className="pr-16">
                <h3 className="text-sky-300 font-semibold mb-2 text-base">
                  스크림
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  피어리스 룰이 적용된 스크림을 자주 하시는 분들
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-rose-400/20 rounded-2xl p-6 hover:border-rose-400/40 transition-all hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-rose-400/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ExclamationTriangleIcon className="w-7 h-7 text-rose-400" />
              </div>
              <div className="pr-16">
                <h3 className="text-rose-300 font-semibold mb-2 text-base">
                  챔피언 부족
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  스크림 시, 계정에 챔피언이 없어 다른 챔피언을 대신 픽하고
                  일일이 설명해야 하는 불편이 있는 분들
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/40 transition-all hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrophyIcon className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="pr-16">
                <h3 className="text-yellow-300 font-semibold mb-2 text-base">
                  대회 준비
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  대회 준비를 위해 밴픽 전략을 연구하고 싶은 분들
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-400/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-400/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <VideoCameraIcon className="w-7 h-7 text-purple-400" />
              </div>
              <div className="pr-16">
                <h3 className="text-purple-300 font-semibold mb-2 text-base">
                  대회 중계
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  대회 진행 시 양 팀의 밴픽 과정을 중계해야 하는 분들
                </p>
              </div>
            </div>
          </div>

          <ScreenshotCarousel />
        </section>

        <section className="max-w-4xl w-full mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Contact
            </h2>
          </div>

          <div className="group relative bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-400/20 rounded-2xl p-8 hover:border-emerald-400/40 transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <EnvelopeIcon className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-emerald-300 font-semibold mb-1 text-base">
                  Email
                </h3>
                <a
                  href="mailto:jyk41993@gmail.com"
                  className="font-mono text-gray-300 text-sm hover:text-emerald-300 transition-colors"
                >
                  jyk41993@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
