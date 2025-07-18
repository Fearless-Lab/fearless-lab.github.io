import type { Timestamp } from "firebase/firestore";

export interface PostDataType {
  id: string;
  author: string;
  content: string;
  createdAt: Timestamp;
  password: string;
  subCategory: string;
  title: string;
}
