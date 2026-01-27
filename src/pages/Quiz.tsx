import { useEffect, useRef, useState } from "react";
import { useQuizGame } from "@/hooks/quiz/useQuizGame";
import QuizSetup from "./components/Quiz/QuizSetup";
import QuizLoading from "./components/Quiz/QuizLoading";
import QuizQuestion from "./components/Quiz/QuizQuestion";
import QuizResults from "./components/Quiz/QuizResults";
import AdSection from "@/components/AdSection";

const Quiz = () => {
  const {
    gameState,
    currentQuestionIndex,
    score,
    selectedItems,
    version,
    feedback,
    questionCountInput,
    setQuestionCountInput,
    setupError,
    userInput,
    setUserInput,
    isLoading,
    startGame,
    handleSubmit,
    resetGame,
  } = useQuizGame();

  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const answerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === "playing") {
      answerInputRef.current?.focus();
    }
  }, [gameState, currentQuestionIndex]);

  useEffect(() => {
    setImageLoading(true);
  }, [currentQuestionIndex]);

  return (
    <>
      <title>LoL 아이템 퀴즈 | Fearless</title>
      <meta
        name="description"
        content="리그 오브 레전드 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임입니다. 롤 아이템을 얼마나 알고 있는지 테스트해보세요!"
      />
      <meta
        name="keywords"
        content="리그오브레전드, 롤 아이템, LoL 아이템 퀴즈, 롤 아이템 맞추기, 롤 아이템 퀴즈, 롤 퀴즈"
      />
      <link rel="canonical" href="https://fearless-lab.github.io/quiz" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="LoL 아이템 퀴즈 - Fearless" />
      <meta
        property="og:description"
        content="롤 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임. 아이템을 얼마나 알고 있나요?"
      />
      <meta
        property="og:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />
      <meta property="og:url" content="https://fearless-lab.github.io/quiz" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LoL 아이템 퀴즈 - Fearless" />
      <meta
        name="twitter:description"
        content="롤 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임. 아이템을 얼마나 알고 있나요?"
      />
      <meta
        name="twitter:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />

      <div className="flex flex-col items-center justify-center p-6 mt-18">
        {gameState === "setup" && (
          <QuizSetup
            questionCountInput={questionCountInput}
            setQuestionCountInput={setQuestionCountInput}
            setupError={setupError}
            onStartGame={(e: React.FormEvent) => {
              e.preventDefault();
              startGame();
            }}
          />
        )}

        {gameState === "playing" && isLoading && <QuizLoading />}

        {gameState === "playing" && !isLoading && selectedItems.length > 0 && (
          <QuizQuestion
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={selectedItems.length}
            score={score}
            itemImageUrl={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${selectedItems[currentQuestionIndex].image}`}
            imageLoading={imageLoading}
            onImageLoad={() => setImageLoading(false)}
            feedback={feedback}
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={handleSubmit}
            answerInputRef={answerInputRef}
          />
        )}

        {gameState === "finished" && (
          <QuizResults
            score={score}
            totalQuestions={selectedItems.length}
            onRestart={resetGame}
          />
        )}
      </div>
      <AdSection />
    </>
  );
};

export default Quiz;
