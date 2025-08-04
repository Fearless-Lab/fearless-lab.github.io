import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import { PHASE } from "@constants/banPick";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  currentStep: number;
  teamName: string;
  localBan: string[];
  localPick: string[];
  matchId: string;
  isGameEnd: Boolean;
  commited: Boolean;
  swapOrder: (string | undefined)[];
}

const CommitButton: React.FC<CTAButtonProps> = ({
  children,
  className,
  disabled,
  currentStep,
  teamName,
  localBan,
  localPick,
  matchId,
  isGameEnd,
  commited,
  swapOrder,
}) => {
  const { commitAndAdvance, toggleIsNextSetPreparing, commitSwapOrder } =
    useBanPickController(matchId);
  const calledRef = useRef(false);

  useEffect(() => {
    calledRef.current = false;
  }, [currentStep]);

  const baseClass =
    "px-8 py-3 font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent relative outline-none cursor-pointer";

  const enabledClass = "bg-[#027088] hover:brightness-90";
  const disabledClass = "bg-gray-400 cursor-not-allowed";

  const onClickHandler = async () => {
    if (calledRef.current) return;

    // 밴픽 끝나고 커밋 안된 경우에만 탄다
    if (!commited && currentStep === 20) {
      await commitSwapOrder(teamName, swapOrder);
      calledRef.current = true;
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
      className={twMerge(
        baseClass,
        disabled ? disabledClass : `${enabledClass} animate-soft-pulse`,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommitButton;
