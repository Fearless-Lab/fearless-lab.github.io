import React from "react";
import { twMerge } from "tailwind-merge";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClass =
    "px-8 py-3 font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent relative outline-none";

  const enabledClass = "bg-[#027088] hover:brightness-90";
  const disabledClass = "bg-gray-400 cursor-not-allowed";

  return (
    <button
      className={twMerge(
        baseClass,
        disabled ? disabledClass : enabledClass,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;
