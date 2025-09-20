import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import { PHASE } from "@constants/banPick";
import React, {
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { twMerge } from "tailwind-merge";
import { useBanPickTimerStore } from "@/store/banPickTimerStore";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  currentStep: number;
  currentSet: number;
  teamName: string;
  localBan: string[];
  localPick: string[];
  matchId: string;
  isGameEnd: Boolean;
  commited: Boolean;
  finished: Boolean;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
}

const CommitButton: React.FC<CTAButtonProps> = ({
  children,
  className,
  disabled,
  currentStep,
  currentSet,
  teamName,
  localBan,
  localPick,
  matchId,
  isGameEnd,
  commited,
  finished,
  setIsHistoryOpen,
}) => {
  const {
    commitAndAdvance,
    toggleIsNextSetPreparing,
    commitSwapConfirm,
    commitTotalPickIfNeeded,
  } = useBanPickController(matchId);

  const { remainingTime } = useBanPickTimerStore();

  const calledRef = useRef(false);

  useEffect(() => {
    calledRef.current = false;
  }, [currentStep]);

  const baseClass =
    "px-8 py-3 font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent relative outline-none cursor-pointer";

  const dynamicClass =
    currentSet === 1 && currentStep === 0
      ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
      : remainingTime <= 10 && currentStep <= 20
      ? "bg-gradient-to-r from-red-800 via-rose-800 to-red-900 hover:from-red-900 hover:to-rose-900"
      : "bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-600 hover:to-blue-700";

  const disabledClass = "bg-gray-400 cursor-not-allowed";

  const onClickHandler = async () => {
    if (finished) setIsHistoryOpen(true);

    if (calledRef.current) return;

    // 밴픽 끝나고 커밋 안된 경우에만 탄다
    if (!commited && currentStep === 20) {
      calledRef.current = true;
      await commitSwapConfirm(teamName);
      await commitTotalPickIfNeeded(teamName);
      return;
    }

    if (isGameEnd) {
      await toggleIsNextSetPreparing(true);
      return;
    }
    const phase = PHASE[currentStep];
    const index = phase.index;

    const selected = phase.type === "pick" ? localPick[index] : localBan[index];
    if (!selected.length) return;

    calledRef.current = true;

    commitAndAdvance(
      teamName,
      selected,
      phase.type as "pick" | "ban",
      currentStep
    );
  };

  return (
    <button
      onClick={onClickHandler}
      style={
        !disabled
          ? ({
              "--ripple-color":
                currentSet === 1 && currentStep === 0
                  ? "#0ea5e9"
                  : remainingTime <= 10 && currentStep <= 20
                  ? "#7f1d1d"
                  : "#0ea5e9",
            } as React.CSSProperties)
          : {}
      }
      className={twMerge(
        baseClass,
        disabled ? disabledClass : dynamicClass,
        !disabled ? "animate-border-ripple" : "",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommitButton;
