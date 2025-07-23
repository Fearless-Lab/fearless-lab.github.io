import { updateDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export const useBanPickController = (matchId: string) => {
  const docRef = doc(db, "banPickSimulations", matchId);

  const goToNextStep = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    const currentSet = data.currentSet ?? 1;
    const currentStep = data.sets?.[currentSet]?.currentStep ?? 0;

    await updateDoc(docRef, {
      [`sets.${currentSet}.currentStep`]: currentStep + 1,
      [`sets.${currentSet}.startedAt`]: serverTimestamp(),
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

  // 조건 검사 후 startedAt 갱신
  const setStartedAtIfNeeded = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    const currentSet = data.currentSet ?? 1;
    const setData = data.sets?.[currentSet];
    if (!setData || setData.startedAt) return;

    const bothReady =
      setData.started.blueTeam === "ready" &&
      setData.started.redTeam === "ready";

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
