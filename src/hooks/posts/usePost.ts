// post 관련 Tanstack query hook

import { fetchPostsByCategory } from "@/apis/firebase/postFirestore";
import { handleSubmitPost } from "@/apis/service/post";
import { PAGE_SIZE } from "@constants/category";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";

export const usePostsInfiniteQuery = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: async ({ pageParam }) => {
      const { posts, lastVisible } = await fetchPostsByCategory(
        category,
        PAGE_SIZE,
        pageParam
      );
      return { posts, nextCursor: lastVisible };
    },
    initialPageParam: null as QueryDocumentSnapshot<DocumentData> | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

// 게시글 등록
export const useCreatePost = (category: string, onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleSubmitPost,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "게시글 등록 완료!",
        timer: 1000,
        showConfirmButton: false,
      });

      // category에 해당하는 게시글 리스트 쿼리만 새로고침
      // reference : https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation#query-matching-with-invalidatequeries
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key.length === 2 && key[0] === "posts" && key[1] === category;
        },
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "게시글 등록 실패",
        text: "문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
    onSettled: () => {
      onClose();
    },
  });
};
