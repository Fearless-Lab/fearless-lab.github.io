interface QuizQuestionProps {
  timeLeft: number;
  score: number;
  itemImageUrl: string;
  imageLoading: boolean;
  onImageLoad: () => void;
  feedback: {
    type: "correct" | "incorrect" | null;
    message: string;
  };
  userInput: string;
  setUserInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  answerInputRef: React.RefObject<HTMLInputElement | null>;
}

const QuizQuestion = ({
  timeLeft,
  score,
  itemImageUrl,
  imageLoading,
  onImageLoad,
  feedback,
  userInput,
  setUserInput,
  onSubmit,
  answerInputRef,
}: QuizQuestionProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`max-w-sm w-full min-h-[380px] bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border-2 transition-colors duration-300 ${
        feedback.type === "correct"
          ? "border-green-500"
          : feedback.type === "incorrect"
            ? "border-red-500"
            : "border-white/20"
      }`}
    >
      <div className="mb-4 flex justify-between items-center">
        <span
          className={`text-2xl font-bold ${
            timeLeft <= 10 ? "text-red-400 animate-pulse" : ""
          }`}
        >
          {formatTime(timeLeft)}
        </span>
        <span className="font-bold text-lg">🎯 {score}</span>
      </div>

      <div className="mb-4 flex justify-center relative">
        {imageLoading && (
          <div className="w-28 h-28 rounded-lg border-2 border-white/30 bg-white/10 animate-pulse" />
        )}
        <img
          src={itemImageUrl}
          alt="아이템 이미지"
          className={`w-28 h-28 rounded-lg border-2 border-white/30 ${
            imageLoading ? "hidden" : "block"
          }`}
          onLoad={onImageLoad}
        />
      </div>

      <div className="mb-4 h-10 flex items-center justify-center">
        {feedback.type && (
          <p
            className={`font-semibold ${
              feedback.type === "correct" ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <input
          ref={answerInputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="아이템 이름을 입력하세요"
          className="w-full px-4 py-2 mb-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={feedback.type !== null}
        />

        <button
          type="submit"
          disabled={feedback.type !== null}
          className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/20 cursor-pointer"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default QuizQuestion;
