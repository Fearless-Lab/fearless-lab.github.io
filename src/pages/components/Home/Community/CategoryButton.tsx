import React from "react";

interface CategoryButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  showSeparator?: boolean; // 구분선 표시 여부
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  isSelected,
  onClick,
  showSeparator = false,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`relative px-4 py-2 text-sm font-medium focus:outline-none transition-colors duration-200
          ${
            isSelected
              ? "text-cyan-600 border-b-2 border-cyan-600"
              : " hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-300"
          }
        `}
      >
        {label}
      </button>
      {showSeparator && (
        <span className="text-gray-400 select-none px-2">|</span>
      )}
    </>
  );
};

export default CategoryButton;
