import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItems, type Item } from "@utils/fetchItems";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type GameState = "setup" | "playing" | "finished";

const Quiz = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [questionCountInput, setQuestionCountInput] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [version, setVersion] = useState<string>("");
  const [setupError, setSetupError] = useState<string>("");

  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    message: string;
  }>({ type: null, message: "" });

  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const answerInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const startGame = () => {
    const questionCount = parseInt(questionCountInput);

    if (!questionCountInput || isNaN(questionCount)) {
      setSetupError("문항 수를 입력해주세요.");
      return;
    }

    if (questionCount < 10 || questionCount > 50) {
      setSetupError("문항 수는 10개에서 50개 사이여야 합니다.");
      return;
    }

    if (!data?.items || data.items.length < questionCount) {
      setSetupError("아이템 데이터를 불러올 수 없습니다.");
      return;
    }

    setSetupError("");

    const uniqueItems = Array.from(
      new Map(
        data.items.map((item) => [item.name.toLowerCase(), item])
      ).values()
    );

    const shuffled = [...uniqueItems].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionCount);

    setSelectedItems(selected);
    setVersion(data.version);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput("");
    setFeedback({ type: null, message: "" });
    setGameState("playing");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.type !== null) return;

    const currentItem = selectedItems[currentQuestionIndex];

    const normalizedAnswer = currentItem.name
      .replace(/[\s\.\-]/g, "")
      .toLowerCase();
    const normalizedInput = userInput.replace(/[\s\.\-]/g, "").toLowerCase();

    if (normalizedAnswer === normalizedInput) {
      setScore((prev) => prev + 1);
      setFeedback({ type: "correct", message: "정답!" });
    } else {
      setFeedback({
        type: "incorrect",
        message: currentItem.name,
      });
    }

    if (currentQuestionIndex + 1 < selectedItems.length) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserInput("");
        setFeedback({ type: null, message: "" });
        setImageLoading(true);

        requestAnimationFrame(() => {
          answerInputRef.current?.focus();
        });
      }, 1500);
    } else {
      setTimeout(() => {
        setGameState("finished");
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameState("setup");
    setQuestionCountInput("");
    setSetupError("");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput("");
    setSelectedItems([]);
  };

  useEffect(() => {
    if (gameState === "playing") {
      answerInputRef.current?.focus();
    }
  }, [gameState]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-sm text-white/60">아이템 불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      <title>LoL 아이템 맞추기</title>

      <meta
        name="description"
        content="리그 오브 레전드 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임입니다."
      />

      <meta
        name="keywords"
        content="리그오브레전드, 롤 아이템, LoL 아이템 퀴즈, 롤 아이템 맞추기, 롤 아이템 퀴즈"
      />

      <link rel="canonical" href="https://fearless-lab.github.io/item-quiz" />

      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {gameState === "setup" && (
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                startGame();
              }}
            >
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
                {setupError && (
                  <p className="text-sm text-red-400">{setupError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
              >
                게임 시작
              </button>
            </form>
          </div>
        )}

        {gameState === "playing" && selectedItems.length > 0 && (
          <div
            className={`max-w-sm w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border-2 transition-colors duration-300 ${
              feedback.type === "correct"
                ? "border-green-500"
                : feedback.type === "incorrect"
                ? "border-red-500"
                : "border-white/20"
            }`}
          >
            <div className="mb-4 flex justify-between">
              <span>
                {currentQuestionIndex + 1} / {selectedItems.length}
              </span>
              <span className="font-bold">맞은 개수: {score}</span>
            </div>

            <div className="mb-4 flex justify-center relative">
              {imageLoading && (
                <div className="w-28 h-28 rounded-lg border-2 border-white/30 bg-white/10 animate-pulse" />
              )}
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${selectedItems[currentQuestionIndex].image}`}
                alt="아이템 이미지"
                className={`w-28 h-28 rounded-lg border-2 border-white/30 ${
                  imageLoading ? "hidden" : "block"
                }`}
                onLoad={() => setImageLoading(false)}
              />
            </div>

            <div className="mb-4 h-10 flex items-center justify-center">
              {feedback.type && (
                <p
                  className={`font-semibold ${
                    feedback.type === "correct"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {feedback.message}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
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
        )}

        {gameState === "finished" && (
          <div className="max-w-sm w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
            <DotLottieReact
              src="https://lottie.host/072ac814-5a52-4a1c-a4c1-88b8693aecb9/qMit0kiGW3.lottie"
              loop
              autoplay
            />

            <div className="mb-6 text-center">
              <p className="text-3xl font-bold mb-3">
                {score} / {selectedItems.length}
              </p>
              <p className="text-md text-white/70">
                정답률: {((score / selectedItems.length) * 100).toFixed(1)}%
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-200 border border-white/30 cursor-pointer"
            >
              다시 하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
