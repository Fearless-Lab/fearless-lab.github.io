import type { Timestamp } from "firebase/firestore";

export interface PostData {
  id: string;
  author: string;
  content: string;
  createdAt: Timestamp;
  password: string;
  subCategory: string;
  title: string;
}
