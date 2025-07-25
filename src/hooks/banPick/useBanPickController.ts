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
      const currentSet = data.currentSet;
      const firestoreStep = data.sets?.[currentSet]?.currentStep;

      // Firestore에 저장된 단계와 클라이언트가 인식한 단계가 다르면 (이미 다른 곳에서 진행된 경우)
      // 트랜잭션을 취소하고 변경하지 않음.
      if (firestoreStep !== localStep) return;

      transaction.update(docRef, {
        [`sets.${currentSet}.currentStep`]: firestoreStep + 1,
        [`sets.${currentSet}.startedAt`]: serverTimestamp(),
      });
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

  // ban, pick 추가하는 로직 👈 얘는 ChampionGrid가 아니라,
  // CTAButton이랑 BanPickTimer에서 해야 함
  // 선택 완료를 누르거나 || 시간이 초과되던가
  const commitBanPick = async (
    team: "blue" | "red",
    champName: string,
    type: "ban" | "pick",
    localStep: number
  ) => {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const currentSet = data.currentSet ?? 1;
      const setData = data.sets?.[currentSet];
      if (!setData) return;

      const firestoreStep = setData.currentStep;
      if (firestoreStep !== localStep) return;

      const targetPath =
        type === "ban"
          ? `sets.${currentSet}.ban.${team}Team`
          : `sets.${currentSet}.pick.${team}Team`;

      const currentList =
        type === "ban"
          ? setData.ban[`${team}Team`]
          : setData.pick[`${team}Team`];

      transaction.update(docRef, {
        [targetPath]: [...currentList, champName],
        [`sets.${currentSet}.startedAt`]: serverTimestamp(),
      });
    });
  };

  return {
    goToNextStep,
    setStartedAtIfNeeded,
    commitBanPick,
  };
};
