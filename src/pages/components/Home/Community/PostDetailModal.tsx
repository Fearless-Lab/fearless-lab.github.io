import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // shadcn Textarea import
import type { PostDataType } from "@/utils/type/post";

type PostDetailModalProps = {
  open: boolean;
  onClose: () => void;
  post: PostDataType;
};

const PostDetailModal = ({ open, onClose, post }: PostDetailModalProps) => {
  const formattedDate = post.createdAt.toDate().toLocaleString();

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="bg-neutral-900 border border-neutral-700 text-white max-h-[90vh] overflow-auto z-100"
        style={{ minWidth: 320 }}
      >
        <div className="text-xs sm:text-sm md:text-base">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg md:text-xl">
              {post.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {post.author}
              <br />
              {formattedDate}
            </DialogDescription>
          </DialogHeader>

          {/* 본문 */}
          <div
            className="mt-4 p-4 border border-white/20 rounded-lg whitespace-pre-wrap"
            style={{ minHeight: "160px" }}
          >
            {post.content}
          </div>

          {/* 댓글 섹션 */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm sm:text-base">댓글</h3>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 text-xs sm:text-sm whitespace-nowrap min-w-[60px]">
                등록
              </Button>
            </div>

            <div className="relative flex flex-col mb-4 border-t border-neutral-700 pt-4">
              <Textarea
                placeholder="댓글을 입력하세요..."
                className="w-full bg-neutral-800 text-white text-xs sm:text-sm"
                rows={3}
              />
            </div>

            <div className="flex flex-col border-t border-neutral-700">
              {/* 댓글 예시 */}
              <div className="py-3 border-b border-neutral-700 last:border-b-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    익명1
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">2025-07-18</p>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-xs sm:text-sm text-gray-300">
                  너무 배고파요
                </p>
              </div>

              <div className="py-3 border-b border-neutral-700 last:border-b-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    익명1
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">2025-07-18</p>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-xs sm:text-sm text-gray-300">
                  너무 배고파요
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <div className="flex justify-between items-center w-full">
              <Button className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs sm:text-sm min-w-[60px]">
                삭제
              </Button>
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 text-xs sm:text-sm min-w-[60px]"
                onClick={onClose}
              >
                닫기
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
