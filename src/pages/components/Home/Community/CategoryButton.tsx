import React from "react";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface CategoryButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center px-3 py-2 rounded-xl border transition-all duration-300 ease-out text-sm font-medium
        ${
          isSelected
            ? "bg-gradient-to-r from-cyan-700 to-cyan-500 text-white shadow-xl ring-2 ring-white/40"
            : "bg-sky-100 text-sky-800 hover:bg-sky-200"
        }
      `}
    >
      {isSelected ? (
        <CheckCircleIcon className="w-4 h-4 text-white" />
      ) : (
        <SparklesIcon className="w-4 h-4 text-cyan-500 group-hover:animate-ping" />
      )}
      <span className="whitespace-nowrap">{label}</span>
      {isSelected && (
        <span className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none" />
      )}
    </button>
  );
};

export default CategoryButton;
