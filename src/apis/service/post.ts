import { hashPassword } from "@/utils/hash";
import { createPost } from "../firebase/postFirestore";

interface SubmitParams {
  category: string;
  subCategory: string;
  title: string;
  content: string;
  author: string;
  rawPassword: string; // 사용자가 입력한 평문 비밀번호
}

export const handleSubmitPost = async ({
  category,
  subCategory,
  title,
  content,
  author,
  rawPassword,
}: SubmitParams) => {
  try {
    const hashedPassword = await hashPassword(rawPassword);

    const newPostId = await createPost({
      category,
      subCategory,
      title,
      content,
      author,
      password: hashedPassword,
    });

    console.log("새 게시글 ID:", newPostId);
    return newPostId;
  } catch (error) {
    console.error("게시글 생성 실패:", error);
    throw error;
  }
};
