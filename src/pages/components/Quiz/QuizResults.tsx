import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResults = ({
  score,
  totalQuestions,
  onRestart,
}: QuizResultsProps) => {
  return (
    <div className="max-w-sm w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
      <DotLottieReact
        src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
        loop
        autoplay
      />

      <div className="mb-6 text-center">
        <p className="text-3xl font-bold mb-3">
          {score} / {totalQuestions}
        </p>
        <p className="text-md text-white/70">
          정답률: {((score / totalQuestions) * 100).toFixed(1)}%
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
      >
        다시 하기
      </button>
    </div>
  );
};

export default QuizResults;
