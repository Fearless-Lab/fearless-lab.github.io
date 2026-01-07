import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItems, type Item } from "@utils/fetchItems";

type GameState = "setup" | "playing" | "finished";

interface UseQuizGameReturn {
  gameState: GameState;
  currentQuestionIndex: number;
  score: number;
  selectedItems: Item[];
  version: string;

  feedback: {
    type: "correct" | "incorrect" | null;
    message: string;
  };

  questionCountInput: string;
  setupError: string;
  userInput: string;
  isLoading: boolean;

  startGame: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetGame: () => void;
  setUserInput: (value: string) => void;
  setQuestionCountInput: (value: string) => void;
}

export const useQuizGame = (): UseQuizGameReturn => {
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

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    enabled: gameState !== "setup", // setup 단계에서는 데이터 페칭하지 않음
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

    setSetupError("");

    if (!data?.items || data.items.length < questionCount) {
      setGameState("playing");
      return;
    }

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

    // Google Analytics 이벤트 전송
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "quiz_start", {
        event_category: "Quiz",
        event_label: "Item Quiz Started",
        question_count: questionCount,
      });
    }
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
      }, 1500);
    } else {
      setTimeout(() => {
        const finalScore =
          normalizedAnswer === normalizedInput ? score + 1 : score;
        const totalQuestions = selectedItems.length;
        const accuracy = ((finalScore / totalQuestions) * 100).toFixed(1);

        // Google Analytics 게임 완료 이벤트 전송
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "quiz_complete", {
            event_category: "Quiz",
            event_label: "Item Quiz Completed",
            question_count: totalQuestions,
            score: finalScore,
            accuracy: parseFloat(accuracy),
          });
        }

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

  // 데이터 로드 완료 시 게임 자동 시작
  useEffect(() => {
    if (gameState === "playing" && data?.items && selectedItems.length === 0) {
      const questionCount = parseInt(questionCountInput);

      if (data.items.length >= questionCount) {
        const uniqueItems = Array.from(
          new Map(
            data.items.map((item) => [item.name.toLowerCase(), item])
          ).values()
        );

        const shuffled = [...uniqueItems].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, questionCount);

        setSelectedItems(selected);
        setVersion(data.version);

        // Google Analytics 이벤트 전송
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "quiz_start", {
            event_category: "Quiz",
            event_label: "Item Quiz Started",
            question_count: questionCount,
          });
        }
      }
    }
  }, [gameState, data, selectedItems.length, questionCountInput]);

  return {
    gameState,
    currentQuestionIndex,
    score,
    selectedItems,
    version,

    feedback,

    questionCountInput,
    setupError,
    userInput,
    isLoading,

    startGame,
    handleSubmit,
    resetGame,
    setUserInput,
    setQuestionCountInput,
  };
};
