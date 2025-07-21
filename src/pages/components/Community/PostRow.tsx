import { formatPostDate } from "@/utils/dayjs";
import type { PostDataType } from "@/types/post";

export interface PostRowProps {
  post: PostDataType;
  onClick: () => void;
}

const PostRow = ({ post, onClick }: PostRowProps) => {
  return (
    <tr
      key={post.id}
      className="text-left text-[9px] text-white border-b border-gray-800 hover:bg-neutral-800 transition cursor-pointer sm:text-xs"
      onClick={onClick}
    >
      <td className="py-3 px-3 text-cyan-300 font-medium truncate whitespace-nowrap sm:text-xs">
        {post.subCategory}
      </td>
      <td className="py-3 px-3 truncate whitespace-nowrap sm:text-xs">
        {post.title}
      </td>
      <td className="py-3 px-3 truncate whitespace-nowrap sm:text-xs">
        {post.author}
      </td>
      <td className="py-3 px-3 truncate whitespace-nowrap text-gray-400 sm:text-xs">
        {formatPostDate(post.createdAt)}
      </td>
    </tr>
  );
};

export default PostRow;
