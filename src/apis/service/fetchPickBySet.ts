import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export const fetchPickBySet = async (
  matchId: string,
  setNumber: number,
  teamName: string,
  oppositeTeam: string
): Promise<string[] | null> => {
  const matchDocRef = doc(db, "banPickSimulations", matchId);
  const docSnap = await getDoc(matchDocRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  const setData = data.sets?.[setNumber];
  const mode = data.mode;

  if (!setData || !setData.pick || !mode) return null;

  if (mode === "fearless") {
    return setData.pick[teamName] || [];
  }

  if (mode === "hardFearless") {
    const ourPick = setData.pick[teamName] || [];
    const oppPick = setData.pick[oppositeTeam] || [];
    return [...ourPick, ...oppPick];
  }

  return null;
};
