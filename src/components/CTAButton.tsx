import React from "react";
import { twMerge } from "tailwind-merge";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClass =
    "px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative outline-none";

  return (
    <button className={twMerge(baseClass, className)} {...props}>
      {children}
    </button>
  );
};

export default CTAButton;
