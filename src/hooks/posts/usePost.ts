import { fetchPostsByCategory } from "@/apis/firebase/postFirestore";
import { useQuery } from "@tanstack/react-query";

export const usePosts = (category?: string) => {
  return useQuery({
    queryKey: ["posts", category],
    queryFn: () => {
      if (!category) return Promise.resolve([]);
      return fetchPostsByCategory(category);
    },
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
  });
};
