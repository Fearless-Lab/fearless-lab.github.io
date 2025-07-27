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
}) => {
  const { commitAndAdvance } = useBanPickController(matchId);
  const calledRef = useRef(false);

  useEffect(() => {
    calledRef.current = false;
  }, [currentStep]);

  const baseClass =
    "px-8 py-3 font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent relative outline-none";

  const enabledClass = "bg-[#027088] hover:brightness-90";
  const disabledClass = "bg-gray-400 cursor-not-allowed";

  const onClickHandler = () => {
    if (calledRef.current) return;

    const phase = PHASE[currentStep];
    const index = phase.index;

    const selected = phase.type === "pick" ? localPick[index] : localBan[index];

    if (selected === undefined) return;

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
        disabled ? disabledClass : enabledClass,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommitButton;
