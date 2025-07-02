import { useState } from "react";
import Goal from "./Goal";
import Graph from "./Graph";
import Review from "./Review";
import { solutionCategory } from "./../../../../../constants/solutionData";

const SolutionDetail = () => {
  const [categoryId, setCategoryId] = useState(0);

  const handleCategoryClick = (index: number) => {
    setCategoryId(index);
  };

  return (
    <>
      <div className="flex gap-3">
        {solutionCategory.map((c, index) => (
          <button
            key={c}
            onClick={() => handleCategoryClick(index)}
            className={`px-4 py-1.5 rounded-lg transform transition duration-300 shadow-xl border border-transparent relative whitespace-nowrap text-sm
            ${
              categoryId === index
                ? "bg-[#015f74] ring-1 font-bold"
                : "bg-[#027088] hover:brightness-90"
            }
          `}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg"></span>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 lg:max-h-[372px] lg:min-h-[372px] w-[75%]">
        <div className="h-full text-left flex flex-col">
          <Goal id={categoryId} />
          <Review id={categoryId} />
        </div>

        <Graph />
      </div>
    </>
  );
};

export default SolutionDetail;
