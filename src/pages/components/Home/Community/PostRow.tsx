import { formatPostDate } from "@/utils/dayjs";
import type { PostData } from "@/utils/type/post";

export interface PostRowProps {
  post: PostData;
}

const PostRow = ({ post }: PostRowProps) => {
  return (
    <tr
      key={post.id}
      className="text-left text-xs text-white border-b border-gray-800 hover:bg-neutral-800 transition cursor-pointer"
    >
      <td className="py-3 px-3 text-cyan-300 font-medium whitespace-nowrap">
        {post.subCategory}
      </td>
      <td className="py-3 px-3 truncate whitespace-nowrap">{post.title}</td>
      <td className="py-3 px-3 truncate whitespace-nowrap">{post.author}</td>
      <td className="py-3 px-3 truncate whitespace-nowrap text-gray-400">
        {formatPostDate(post.createdAt)}
      </td>
    </tr>
  );
};

export default PostRow;
