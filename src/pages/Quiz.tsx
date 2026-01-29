import { useEffect, useRef } from "react";
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
    currentItem,
    version,
    timeLeft,
    feedback,
    userInput,
    setUserInput,
    startGame,
    handleSubmit,
    resetGame,
    imageLoading,
    onImageLoad,
  } = useQuizGame();

  const answerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === "playing") {
      answerInputRef.current?.focus();
    }
  }, [gameState, currentQuestionIndex]);

  return (
    <>
      <title>LoL 아이템 퀴즈 | Fearless</title>
      <meta
        name="description"
        content="리그 오브 레전드 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임입니다. 60초 안에 최대한 많은 아이템을 맞춰보세요!"
      />
      <meta
        name="keywords"
        content="리그오브레전드, 롤 아이템, LoL 아이템 퀴즈, 롤 아이템 맞추기, 롤 아이템 퀴즈, 롤 퀴즈, 타임어택"
      />
      <link rel="canonical" href="https://fearless-lab.github.io/quiz" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="LoL 아이템 퀴즈 - Fearless" />
      <meta
        property="og:description"
        content="롤 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임. 60초 타임어택!"
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
        content="롤 아이템 이미지를 보고 이름을 맞히는 퀴즈 게임. 60초 타임어택!"
      />
      <meta
        name="twitter:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />

      <div className="flex flex-col items-center justify-center p-6 mt-18">
        {gameState === "setup" && (
          <QuizSetup onStartGame={startGame} />
        )}

        {gameState === "playing" && !currentItem && <QuizLoading />}

        {gameState === "playing" && currentItem && (
          <QuizQuestion
            timeLeft={timeLeft}
            score={score}
            itemImageUrl={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${currentItem.image}`}
            imageLoading={imageLoading}
            onImageLoad={onImageLoad}
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
            totalAttempts={currentQuestionIndex}
            onRestart={resetGame}
          />
        )}
      </div>
      <AdSection />
    </>
  );
};

export default Quiz;
