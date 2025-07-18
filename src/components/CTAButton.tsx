import React from "react";

interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CTAButton: React.FC<CTAButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-8 py-3 bg-[#027088] font-semibold rounded-lg transform transition duration-300 shadow-xl border border-transparent hover:brightness-90 relative"
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;
