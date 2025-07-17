import CategoryButton from "@/pages/components/Home/Community/CategoryButton";
import { category, posts } from "@constants/category";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CommunityWriteModal from "./CommunityWriteModal";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { category: currentCategory } = useParams();

  const selectedIndex = category.findIndex((c) => c.key === currentCategory);

  // 유효하지 않은 category면 404 페이지로 리다이렉트
  if (selectedIndex === -1) return <Navigate to="/404" replace />;

  const index = selectedIndex === -1 ? 0 : selectedIndex;

  const handleCategoryClick = (index: number) => {
    navigate(`/community/${category[index].key}`);
  };

  return (
    <div className="flex flex-col gap-6 py-6 mx-auto">
      {/* 카테고리 버튼 */}
      <div className="flex gap-3 flex-nowrap justify-center">
        {category.map(({ key, label }, i) => {
          const isSelected = i === index;

          return (
            <CategoryButton
              key={key}
              label={label}
              isSelected={isSelected}
              onClick={() => handleCategoryClick(i)}
            />
          );
        })}
      </div>
      <CommunityWriteModal />
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
                className="text-left text-xs text-white border-b border-gray-800 hover:bg-neutral-800 transition cursor-pointer"
              >
                <td className="py-3 px-3 text-cyan-300 font-medium whitespace-nowrap">
                  {post.category}
                </td>
                <td className="py-3 px-3 truncate whitespace-nowrap">
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

export default CommunityDetail;
