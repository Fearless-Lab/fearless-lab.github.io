import { db } from "@/firebase";
import type { PostDataType } from "@/utils/type/post";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";

export interface PostType {
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
}: PostType): Promise<string> => {
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

import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export const fetchPostsByCategory = async (
  category: string,
  limitSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{
  posts: PostDataType[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  const postsRef = collection(db, "posts", category, "items");

  let q = query(postsRef, orderBy("createdAt", "desc"), limit(limitSize));

  if (cursor) {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(limitSize)
    );
  }

  const querySnapshot = await getDocs(q);

  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PostDataType[];

  const lastVisible =
    querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : null;

  return { posts, lastVisible };
};
