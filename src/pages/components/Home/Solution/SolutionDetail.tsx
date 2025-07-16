import { useState } from "react";
import { category, posts } from "@constants/solutionData";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";

const SolutionDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="flex flex-col gap-6 py-6 mx-auto">
      {/* 카테고리 버튼 */}
      <div className="flex gap-3 flex-nowrap justify-center">
        {category.map((c, index) => {
          const isSelected = selectedCategory === index;
          return (
            <button
              key={c}
              onClick={() => setSelectedCategory(index)}
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
              <span className="whitespace-nowrap">{c}</span>
              {isSelected && (
                <span className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* 게시글 테이블, 추후 컴포넌트 분리 및 props 타입 지정 */}
      <div className="w-full max-w-5xl mx-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="py-3 px-3 font-medium w-1/6">분류</th>
              <th className="py-3 px-3 font-medium w-2/5 ">제목</th>
              <th className="py-3 px-3 font-medium w-1/5">작성자</th>
              <th className="py-3 px-3 font-medium w-auto sm:w-1/6">
                작성일자
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr
                key={idx}
                className="text-left text-xs text-white border-b border-gray-800 hover:bg-neutral-800 transition"
              >
                <td className="py-3 px-3 text-cyan-300 font-medium whitespace-nowrap">
                  {post.category}
                </td>
                <td className="py-3 px-3 truncate whitespace-nowrap cursor-pointer">
                  {post.title}
                </td>
                <td className="py-3 px-3 truncate whitespace-nowrap">
                  {post.presenter}
                </td>
                <td className="py-3 px-3 truncate whitespace-nowrap text-gray-400">
                  {post.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolutionDetail;
