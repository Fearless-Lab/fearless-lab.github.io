import { useMemo, useCallback } from "react";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface UseBanPickInitOptions {
  matchId: string;
  teamName: string;
  oppositeTeam: string;
  mode: string;
  initialTeam: "blue" | "red";
}

export const useBanPickInit = ({
  matchId,
  teamName,
  oppositeTeam,
  mode,
  initialTeam,
}: UseBanPickInitOptions) => {
  const docRef = useMemo(
    () => doc(db, "banPickSimulations", matchId),
    [matchId]
  );

  const initializeDoc = useCallback(async () => {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const firstSetNumber = 1;

      await setDoc(docRef, {
        mode,
        currentSet: firstSetNumber,
        sets: {
          [firstSetNumber]: {
            teams: {
              blue: initialTeam === "blue" ? teamName : oppositeTeam,
              red: initialTeam === "red" ? teamName : oppositeTeam,
            },
            currentStep: 0,
            started: {
              blueTeam: "pending",
              redTeam: "pending",
            },
            ban: {
              blueTeam: [],
              redTeam: [],
            },
            pick: {
              blueTeam: [],
              redTeam: [],
            },
            startedAt: null,
          },
        },
      });
    }
  }, [docRef, mode, initialTeam, teamName, oppositeTeam]);

  const subscribeToStart = useCallback(
    (onReady: () => void) => {
      return onSnapshot(docRef, async (snapshot) => {
        console.log("지금은");
        const data = snapshot.data();
        if (!data) return;

        const currentSet = data.currentSet ?? 1;
        const setData = data.sets?.[currentSet];
        if (!setData) return;

        const started = setData.started;
        const bothReady =
          started.blueTeam === "ready" && started.redTeam === "ready";

        // 준비 완료 시 onReady 호출
        if (bothReady) onReady();
      });
    },
    [docRef]
  );

  const subscribeToSimulationDoc = useCallback(
    (callback: (data: any) => void) => {
      return onSnapshot(docRef, (snapshot) => {
        console.log("지금은");
        const data = snapshot.data();
        if (!data) return;
        callback(data);
      });
    },
    [docRef]
  );

  const markAsReady = useCallback(async () => {
    const teamKey = initialTeam === "blue" ? "blueTeam" : "redTeam";

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const currentSet = data?.currentSet ?? 1;

    await updateDoc(docRef, {
      [`sets.${currentSet}.started.${teamKey}`]: "ready",
      [`sets.${currentSet}.teams.${initialTeam}`]: teamName,
    });
  }, [docRef, initialTeam, teamName]);

  const getCurrentTeams = useCallback(async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const currentSet = data?.currentSet ?? 1;
    const teams = data?.sets?.[currentSet]?.teams;

    if (!teams) return null;

    return {
      blue: teams.blue,
      red: teams.red,
    };
  }, [docRef]);

  return {
    initializeDoc,
    subscribeToStart,
    markAsReady,
    getCurrentTeams,
    subscribeToSimulationDoc,
  };
};
