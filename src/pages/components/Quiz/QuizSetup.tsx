import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface QuizSetupProps {
  questionCountInput: string;
  setQuestionCountInput: (value: string) => void;
  setupError: string;
  onStartGame: (e: React.FormEvent) => void;
}

const QuizSetup = ({
  questionCountInput,
  setQuestionCountInput,
  setupError,
  onStartGame,
}: QuizSetupProps) => {
  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
      <DotLottieReact
        src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
        loop
        autoplay
      />

      <p className="text-center mb-2">
        아이템 이미지를 보고 이름을 맞춰보세요!
      </p>
      <p className="text-center text-white/50 text-xs mb-6">
        아이템 이름은 정확히 입력해 주세요! 띄어쓰기는 봐드릴게요😊
      </p>

      <form onSubmit={onStartGame}>
        <label htmlFor="questionCount" className="block text-lg mb-2">
          문항 수 ( 10 ~ 50 )
        </label>

        <input
          id="questionCount"
          type="number"
          value={questionCountInput}
          onChange={(e) => setQuestionCountInput(e.target.value)}
          placeholder="예: 20"
          className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
            setupError
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-white/50"
          }`}
        />

        <div className="mt-2 min-h-[20px]">
          {setupError && <p className="text-sm text-red-400">{setupError}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
        >
          게임 시작
        </button>
      </form>
    </div>
  );
};

export default QuizSetup;
