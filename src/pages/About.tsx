import CTAButton from "@/components/CTAButton";
import { useScrollReveal } from "@/hooks/animation/useScrollReveal";
import {
  UsersIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  EnvelopeIcon,
  MagnifyingGlassPlusIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScreenshotCarousel from "./components/BanPickSimulation/ScreenshotCarousel";

const About = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useScrollReveal(divRef);

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-32 text-white"
      ref={divRef}
    >
      <section className="max-w-3xl w-full mb-12 text-sm">
        <h2 className="text-2xl font-semibold mb-4">
          이런 분들을 위한 서비스입니다
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <UsersIcon className="w-6 h-6 text-sky-400 shrink-0" />
            <span>피어리스 룰이 적용된 내전(스크림)을 자주 하시는 분들</span>
          </li>
          <li className="flex items-start gap-2">
            <ExclamationTriangleIcon className="w-6 h-6 text-rose-400 shrink-0" />
            <span>
              계정에 챔피언이 없어 다른 챔피언을 대신 픽하고 일일이 설명해야
              하는 불편이 있는 분들
            </span>
          </li>
          <li className="flex items-start gap-2">
            <TrophyIcon className="w-6 h-6 text-yellow-400 shrink-0" />
            <span>대회 준비를 위해 밴픽 전략을 연구하고 싶은 분들</span>
          </li>

          <li className="flex items-start gap-2">
            <VideoCameraIcon className="w-6 h-6 text-purple-400 shrink-0" />
            <span>대회 진행 시 양 팀의 밴픽 과정을 중계해야 하는 분들</span>
          </li>
        </ul>

        <div className="hidden md:block">
          <ScreenshotCarousel />
          <p className="mt-3 text-sm text-gray-500 text-center flex items-center justify-center gap-1">
            <MagnifyingGlassPlusIcon className="w-4 h-4" />
            이미지를 클릭하면 스크린샷을 큰 화면에서 볼 수 있습니다
          </p>
        </div>
      </section>

      <section className="max-w-3xl w-full mb-12 text-sm">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="mb-4 text-gray-300">
          피드백이나 추가되었으면 하는 기능이 있다면 언제든 편하게 연락주세요 !
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <EnvelopeIcon className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <span className="font-mono">jyk41993@gmail.com</span>
            </span>
          </li>
        </ul>
      </section>

      <div className="max-w-3xl w-full text-left">
        <CTAButton onClick={() => navigate("/banPick")}>
          시뮬레이션 시작하기
        </CTAButton>
      </div>
    </div>
  );
};

export default About;
