import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface QuizSetupProps {
  onStartGame: () => void;
}

const QuizSetup = ({ onStartGame }: QuizSetupProps) => {
  return (
    <div className="max-w-sm w-full min-h-[380px] bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 flex flex-col justify-center">
      <DotLottieReact
        src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
        loop
        autoplay
      />
      <p className="text-center mb-2">
        아이템 이미지를 보고 이름을 맞춰보세요!
      </p>
      <p className="text-center text-white/50 text-xs mb-2">
        60초 안에 최대한 많은 아이템을 맞춰보세요 🔥
      </p>
      <p className="text-center text-white/50 text-xs mb-6">
        띄어쓰기는 봐드릴게요😊
      </p>

      <button
        onClick={onStartGame}
        className="w-full py-3 mt-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
      >
        게임 시작
      </button>
    </div>
  );
};

export default QuizSetup;
