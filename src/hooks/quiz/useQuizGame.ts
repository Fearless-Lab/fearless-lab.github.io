import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItems, type Item } from "@utils/fetchItems";

type GameState = "setup" | "playing" | "finished";

const GAME_DURATION = 60; // 60초

interface UseQuizGameReturn {
  gameState: GameState;
  currentQuestionIndex: number;
  score: number;
  currentItem: Item | null;
  version: string;
  timeLeft: number;
  imageLoading: boolean;

  feedback: {
    type: "correct" | "incorrect" | null;
    message: string;
  };

  userInput: string;
  isLoading: boolean;

  startGame: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetGame: () => void;
  setUserInput: (value: string) => void;
  onImageLoad: () => void;
}

export const useQuizGame = (): UseQuizGameReturn => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [nextItem, setNextItem] = useState<Item | null>(null);
  const [version, setVersion] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [allItems, setAllItems] = useState<Item[]>([]);

  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    message: string;
  }>({ type: null, message: "" });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const usedItemsRef = useRef<Set<string>>(new Set());
  const isNextImageReadyRef = useRef<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    enabled: gameState !== "setup",
  });

  // 중복 없이 다음 아이템 선택
  const getNextItem = useCallback((items: Item[]): Item => {
    // 모두 사용했으면 리셋
    if (usedItemsRef.current.size >= items.length) {
      usedItemsRef.current.clear();
    }

    let item: Item;
    do {
      const randomIndex = Math.floor(Math.random() * items.length);
      item = items[randomIndex];
    } while (usedItemsRef.current.has(item.name));

    usedItemsRef.current.add(item.name);
    return item;
  }, []);

  const startGame = () => {
    if (!data?.items) {
      setGameState("playing");
      return;
    }

    const uniqueItems = Array.from(
      new Map(
        data.items.map((item) => [item.name.toLowerCase(), item]),
      ).values(),
    );

    usedItemsRef.current.clear();
    setAllItems(uniqueItems);
    setVersion(data.version);
    const firstItem = getNextItem(uniqueItems);
    const secondItem = getNextItem(uniqueItems);
    setCurrentItem(firstItem);
    setNextItem(secondItem);
    setImageLoading(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput("");
    setTimeLeft(GAME_DURATION);
    setFeedback({ type: null, message: "" });
    setGameState("playing");

    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "quiz_start", {
        event_category: "Quiz",
        event_label: "Item Quiz Started (Time Attack)",
        time_limit: GAME_DURATION,
      });
    }
  };

  const endGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "quiz_complete", {
        event_category: "Quiz",
        event_label: "Item Quiz Completed (Time Attack)",
        score: score,
        questions_answered: currentQuestionIndex,
      });
    }

    setGameState("finished");
  }, [score, currentQuestionIndex]);

  // 타이머 로직
  useEffect(() => {
    // 이미 타이머가 실행 중이면 아무것도 하지 않음
    if (timerRef.current) return;

    if (gameState === "playing" && currentItem) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, currentItem]);

  // 시간 종료 감지
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing") {
      endGame();
    }
  }, [timeLeft, gameState, endGame]);

  // 다음 이미지 prefetch
  useEffect(() => {
    if (nextItem && version) {
      isNextImageReadyRef.current = false;
      const img = new Image();
      img.onload = () => {
        isNextImageReadyRef.current = true;
      };
      img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${nextItem.image}`;
    }
  }, [nextItem, version]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.type !== null || !currentItem) return;

    const normalizedAnswer = currentItem.name
      .replace(/[\s\.\-]/g, "")
      .toLowerCase();
    const normalizedInput = userInput.replace(/[\s\.\-]/g, "").toLowerCase();

    const isCorrect = normalizedAnswer === normalizedInput;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback({ type: "correct", message: "정답!" });
    } else {
      setFeedback({
        type: "incorrect",
        message: currentItem.name,
      });
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentItem(nextItem);
      setImageLoading(!isNextImageReadyRef.current);
      setNextItem(getNextItem(allItems));
      setUserInput("");
      setFeedback({ type: null, message: "" });
    }, 1000);
  };

  const resetGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    usedItemsRef.current.clear();
    setGameState("setup");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput("");
    setCurrentItem(null);
    setNextItem(null);
    setTimeLeft(GAME_DURATION);
    setAllItems([]);
  };

  // 데이터 로드 완료 시 게임 자동 시작
  useEffect(() => {
    if (gameState === "playing" && data?.items && !currentItem) {
      const uniqueItems = Array.from(
        new Map(
          data.items.map((item) => [item.name.toLowerCase(), item]),
        ).values(),
      );

      usedItemsRef.current.clear();
      setAllItems(uniqueItems);
      setVersion(data.version);
      const firstItem = getNextItem(uniqueItems);
      const secondItem = getNextItem(uniqueItems);
      setCurrentItem(firstItem);
      setNextItem(secondItem);
      setImageLoading(true);

      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "quiz_start", {
          event_category: "Quiz",
          event_label: "Item Quiz Started (Time Attack)",
          time_limit: GAME_DURATION,
        });
      }
    }
  }, [gameState, data, currentItem, getNextItem]);

  const onImageLoad = () => setImageLoading(false);

  return {
    gameState,
    currentQuestionIndex,
    score,
    currentItem,
    version,
    timeLeft,
    imageLoading,

    feedback,

    userInput,
    isLoading,

    startGame,
    handleSubmit,
    resetGame,
    setUserInput,
    onImageLoad,
  };
};
