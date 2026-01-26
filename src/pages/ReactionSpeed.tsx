import { useEffect, useRef, useState } from "react";
import { Zap, Hourglass, Target, AlertTriangle, Trophy } from "lucide-react";
import { saveReactionSpeed } from "@/apis/firebase/reactionSpeed";
import AdSection from "@/components/AdSection";

type GameState =
  | "ready"
  | "waiting"
  | "click"
  | "tooEarly"
  | "finished"
  | "result";

const ReactionSpeed = () => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [attempts, setAttempts] = useState<number[]>([]);
  const [currentReactionTime, setCurrentReactionTime] = useState<number | null>(
    null,
  );

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);
  const mouseDownTimeRef = useRef<number>(0);

  const averageTime =
    attempts.length > 0
      ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
      : 0;

  const startRound = () => {
    setGameState("waiting");

    const waitTime = 2000 + Math.random() * 3000;

    timeoutRef.current = window.setTimeout(() => {
      setGameState("click");

      // 브라우저가 실제로 화면을 그린 직후에 시작 시간 기록
      requestAnimationFrame(() => {
        startTimeRef.current = performance.now();
      });
    }, waitTime);
  };

  const startTest = () => {
    setAttempts([]);
    setCurrentReactionTime(null);
    startRound();
  };

  const handleMouseDown = () => {
    mouseDownTimeRef.current = performance.now();
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // 타이머 해제
      }
      setGameState("tooEarly"); // 101 line
      return;
    }

    if (gameState === "click") {
      // 마우스를 미리 눌러놨다면
      if (mouseDownTimeRef.current < startTimeRef.current) {
        setGameState("tooEarly");
        mouseDownTimeRef.current = 0;
        return;
      }

      // mouseDown 시점을 기준으로 측정 (더 정확함)
      const reactionTime = Math.round(
        mouseDownTimeRef.current - startTimeRef.current,
      );
      setCurrentReactionTime(reactionTime);

      const newAttempts = [...attempts, reactionTime];
      setAttempts(newAttempts);

      if (newAttempts.length >= 5) {
        setGameState("finished");

        // Firebase에 평균값 저장 (익명 데이터)
        const avgTime = Math.round(
          newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length,
        );
        saveReactionSpeed(avgTime).catch((error) => {
          console.error("Failed to save reaction speed:", error);
        });
      } else {
        setGameState("result");
        setTimeout(() => {
          setCurrentReactionTime(null);
          startRound();
        }, 2000);
      }

      mouseDownTimeRef.current = 0;
    }

    if (gameState === "tooEarly") {
      setCurrentReactionTime(null);
      startRound();
    }

    if (gameState === "ready" || gameState === "finished") {
      startTest();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    switch (gameState) {
      case "ready":
        return "bg-white/10 border-white/20 transition-all duration-200";
      case "waiting":
        return "bg-red-500/20 border-red-500/50"; // transition 없음 (즉시 변경)
      case "click":
      case "result":
        return "bg-green-500/20 border-green-500/50"; // transition 없음 (즉시 변경)
      case "tooEarly":
        return "bg-yellow-500/20 border-yellow-500/50 transition-all duration-200";
      case "finished":
        return "bg-white/10 border-white/20 transition-all duration-200";
      default:
        return "bg-white/10 border-white/20 transition-all duration-200";
    }
  };

  const getCursorStyle = () => {
    return gameState === "result" ? "cursor-not-allowed" : "cursor-pointer";
  };

  const getMessage = () => {
    switch (gameState) {
      case "ready":
        return {
          icon: <Zap className="w-16 h-16 mx-auto mb-4" />,
          title: "반응속도 테스트",
          subtitle: "클릭하여 시작",
        };
      case "waiting":
        return {
          icon: <Hourglass className="w-16 h-16 mx-auto mb-4" />,
          title: "Wait...",
          subtitle: " ",
        };
      case "click":
      case "result":
        return {
          icon: <Target className="w-16 h-16 mx-auto mb-4" />,
          title: "Click!",
          subtitle: currentReactionTime ? `${currentReactionTime}ms` : "",
        };
      case "tooEarly":
        return {
          icon: <AlertTriangle className="w-16 h-16 mx-auto mb-4" />,
          title: "너무 빨라요!",
          subtitle: "초록색이 된 후에 클릭하세요",
        };
      case "finished":
        return {
          icon: <Trophy className="w-16 h-16 mx-auto mb-4" />,
          title: `평균: ${averageTime}ms`,
          subtitle: "클릭하여 다시 시작",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const message = getMessage();

  return (
    <>
      <title>반응속도 테스트 | Fearless</title>
      <meta
        name="description"
        content="당신의 반응속도를 측정해보세요. 5번의 측정으로 평균 반응속도를 확인할 수 있습니다."
      />
      <meta
        name="keywords"
        content="반응속도 테스트, 반응속도, reaction time test, 반응 시간"
      />
      <link
        rel="canonical"
        href="https://fearless-lab.github.io/reactionSpeed"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="반응속도 테스트 - Fearless" />
      <meta
        property="og:description"
        content="5번의 측정으로 평균 반응속도를 확인해보세요."
      />
      <meta
        property="og:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />
      <meta
        property="og:url"
        content="https://fearless-lab.github.io/reactionSpeed"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="반응속도 테스트 - Fearless" />
      <meta
        name="twitter:description"
        content="5번의 측정으로 평균 반응속도를 확인해보세요."
      />
      <meta
        name="twitter:image"
        content="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png"
      />

      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6">
        <div
          className={`max-w-lg w-full h-[400px] backdrop-blur-md rounded-xl p-8 shadow-2xl border-2 select-none flex flex-col justify-center ${getBackgroundColor()} ${getCursorStyle()}`}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
        >
          <div className="text-center">
            {message.icon && <div className="text-white">{message.icon}</div>}
            <h1 className="text-3xl font-bold text-white mb-4">
              {message.title}
            </h1>
            <div className="h-8 mb-6">
              <p className="text-md text-white/90">{message.subtitle}</p>
            </div>

            {attempts.length > 0 && gameState !== "ready" && (
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white/90 text-sm mb-3">
                  시도: {attempts.length} / 5
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {attempts.map((time, index) => (
                    <div
                      key={index}
                      className="bg-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                    >
                      {time}ms
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gameState === "ready" && (
              <div className="text-white/60 text-sm">
                <p>화면이 초록색으로 바뀌면 최대한 빠르게 클릭하세요</p>
                <p className="mt-2">총 5번 측정합니다</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSection />
    </>
  );
};

export default ReactionSpeed;
