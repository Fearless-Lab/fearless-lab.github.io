import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MIN_VALID_TIME = 100;
const MAX_VALID_TIME = 1000;

export const saveReactionSpeed = async (averageTime: number): Promise<void> => {
  if (averageTime < MIN_VALID_TIME || averageTime > MAX_VALID_TIME) {
    console.warn(
      `Invalid reaction time: ${averageTime}ms (valid range: ${MIN_VALID_TIME}-${MAX_VALID_TIME}ms)`
    );
    return;
  }

  const reactionSpeedsRef = collection(db, "reactionSpeeds");

  await addDoc(reactionSpeedsRef, {
    averageTime,
    timestamp: serverTimestamp(),
  });
};
