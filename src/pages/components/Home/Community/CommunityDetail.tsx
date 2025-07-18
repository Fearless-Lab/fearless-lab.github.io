import { useNavigate, useParams, Navigate } from "react-router-dom";
import { category } from "@constants/category";
import CategoryButton from "@/pages/components/Home/Community/CategoryButton";
import CommunityWriteModal from "./CommunityWriteModal";
import PostRow from "./PostRow";
import PostLoading from "./PostLoading";
import { usePostsInfiniteQuery } from "@/hooks/posts/usePost";
import CTAButton from "@/components/CTAButton";
import { ChevronDownIcon } from "lucide-react";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { category: currentCategory } = useParams();

  // 존재하지 않는 카테고리라면 404로 리다이렉트
  const categoryIndex = category.findIndex((c) => c.key === currentCategory);
  if (categoryIndex === -1) return <Navigate to="/404" replace />;

  const handleCategoryClick = (index: number) => {
    navigate(`/community/${category[index].key}`);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePostsInfiniteQuery(currentCategory as string);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="flex flex-col gap-6 py-6 mx-auto">
      {/* 카테고리 버튼 */}
      <div className="flex gap-3 flex-nowrap justify-center">
        {category.map(({ key, label }, idx) => {
          const isSelected = idx === categoryIndex;

          return (
            <CategoryButton
              key={key}
              label={label}
              isSelected={isSelected}
              onClick={() => handleCategoryClick(idx)}
            />
          );
        })}
      </div>

      <CommunityWriteModal />

      <div className="w-full max-w-5xl mx-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="py-3 px-3 font-medium w-1/6">분류</th>
              <th className="py-3 px-3 font-medium w-2/5">제목</th>
              <th className="py-3 px-3 font-medium w-1/5">작성자</th>
              <th className="py-3 px-3 font-medium w-auto sm:w-1/6">
                작성일자
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <PostLoading />
            ) : (
              posts.map((post) => <PostRow key={post.id} post={post} />)
            )}
          </tbody>
        </table>

        {/* 더보기 버튼 */}
        {!isLoading && (
          <div className="flex flex-col items-center mt-8 gap-2">
            {isFetchingNextPage ? (
              <p className="text-gray-500 text-sm select-none">
                게시글을 불러오고 있어요! ⏳
              </p>
            ) : hasNextPage ? (
              <CTAButton
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 justify-center px-6 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-[#027088] to-[#054E5F] hover:from-[#054E5F] hover:to-[#027088] transition"
              >
                더 많은 게시글 보기
                <ChevronDownIcon className="w-5 h-5" />
              </CTAButton>
            ) : (
              <p className="text-gray-500 text-sm select-none">
                마지막 페이지네요! 🎉
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
