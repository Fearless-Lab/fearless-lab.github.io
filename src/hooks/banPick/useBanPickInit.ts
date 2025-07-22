import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface UseBanPickInitOptions {
  matchId: string;
  teamName: string;
  mode: string;
  initialTeam: "blue" | "red";
}

export const useBanPickInit = ({
  matchId,
  teamName,
  mode,
  initialTeam,
}: UseBanPickInitOptions) => {
  const docRef = doc(db, "banPickSimulations", matchId);

  const initializeDoc = async () => {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        mode,
        sets: {
          "1": {
            teams: {
              blue: initialTeam === "blue" ? teamName : "",
              red: initialTeam === "red" ? teamName : "",
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
          },
        },
      });
    }
  };

  const subscribeToStart = (onReady: () => void) => {
    return onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (!data) return;

      const started = data.sets["1"].started;
      const bothReady =
        started.blueTeam === "ready" && started.redTeam === "ready";

      if (bothReady) onReady();
    });
  };

  const markAsReady = async () => {
    const teamKey = initialTeam === "blue" ? "blueTeam" : "redTeam";

    await updateDoc(docRef, {
      [`sets.1.started.${teamKey}`]: "ready",
      [`sets.1.teams.${initialTeam}`]: teamName,
    });
  };

  return { initializeDoc, subscribeToStart, markAsReady };
};
