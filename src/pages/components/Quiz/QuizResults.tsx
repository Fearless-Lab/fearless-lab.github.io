import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface QuizResultsProps {
  score: number;
  totalAttempts: number;
  onRestart: () => void;
}

const QuizResults = ({ score, totalAttempts, onRestart }: QuizResultsProps) => {
  return (
    <div className="max-w-sm w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
      <DotLottieReact
        src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
        loop
        autoplay
      />

      <div className="mb-4 text-center">
        <p className="text-lg text-white/70 mb-1">60초 동안</p>

        <p className="text-sm text-white/50">
          {totalAttempts}문제 중 {score}개 맞춤
          {totalAttempts > 0 && (
            <span> ({((score / totalAttempts) * 100).toFixed(0)}%)</span>
          )}
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
      >
        다시 도전하기
      </button>
    </div>
  );
};

export default QuizResults;
