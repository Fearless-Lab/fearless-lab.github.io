import { db } from "@/firebase";
import type { PostData } from "@/utils/type/post";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

interface CreatePostParams {
  category: string;
  subCategory: string;
  title: string;
  content: string;
  author: string;
  password: string;
}

export const createPost = async ({
  category,
  subCategory,
  title,
  content,
  author,
  password,
}: CreatePostParams): Promise<string> => {
  const categoryDocRef = doc(db, "posts", category); //  posts/{category} 문서 참조
  const itemsColRef = collection(categoryDocRef, "items"); //  하위 컬렉션 posts/{category}/items

  const docRef = await addDoc(itemsColRef, {
    subCategory,
    title,
    content,
    author,
    password,
    createdAt: serverTimestamp(),
  });

  await updateDoc(docRef, { id: docRef.id });

  return docRef.id;
};

export const fetchPostsByCategory = async (category: string) => {
  const postsRef = collection(db, "posts", category, "items");
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PostData[];

  return posts;
};
