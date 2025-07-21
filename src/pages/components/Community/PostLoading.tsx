const PostLoading = () => {
  return (
    <tr>
      <td colSpan={4} className="py-10 text-center text-sm">
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        게시글을 불러오고 있어요! ⏳
      </td>
    </tr>
  );
};

export default PostLoading;
