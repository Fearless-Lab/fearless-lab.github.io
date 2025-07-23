import {
  updateDoc,
  getDoc,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useBanPickController = (matchId: string) => {
  const docRef = doc(db, "banPickSimulations", matchId);

  const goToNextStep = async (localStep: number) => {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const currentSet = data.currentSet ?? 1;
      const firestoreStep = data.sets?.[currentSet]?.currentStep ?? 0;

      // 🔒 현재 firestore와 localStep이 일치할 때만 증가
      if (firestoreStep !== localStep) return;

      transaction.update(docRef, {
        [`sets.${currentSet}.currentStep`]: firestoreStep + 1,
        [`sets.${currentSet}.startedAt`]: serverTimestamp(),
      });
    });
  };

  const setStartedAt = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    const currentSet = data.currentSet ?? 1;

    await updateDoc(docRef, {
      [`sets.${currentSet}.startedAt`]: serverTimestamp(),
    });
  };

  const setStartedAtIfNeeded = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    const currentSet = data.currentSet ?? 1;
    const setData = data.sets?.[currentSet];
    if (!setData || setData.startedAt) return;

    const bothReady =
      setData.started?.blueTeam === "ready" &&
      setData.started?.redTeam === "ready";

    if (bothReady) {
      await updateDoc(docRef, {
        [`sets.${currentSet}.startedAt`]: serverTimestamp(),
      });
    }
  };

  return {
    goToNextStep,
    setStartedAt,
    setStartedAtIfNeeded,
  };
};
