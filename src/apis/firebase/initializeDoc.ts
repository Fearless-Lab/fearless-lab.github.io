import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function initializeDoc({
  matchId,
  mode,
  blueTeamName,
  redTeamName,
}: {
  matchId: string;
  mode: string;
  blueTeamName: string;
  redTeamName: string;
}) {
  const docRef = doc(db, "banPickSimulations", matchId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const firstSetNumber = 1;

    await setDoc(docRef, {
      mode,
      isNextSetPreparing: false,
      currentSet: firstSetNumber,
      total: {
        [blueTeamName]: [],
        [redTeamName]: [],
      },
      sets: {
        [firstSetNumber]: {
          teams: {
            blue: blueTeamName,
            red: redTeamName,
          },
          currentStep: 0,
          started: {
            blueTeam: "pending",
            redTeam: "pending",
          },
          ban: {
            [blueTeamName]: Array(5).fill(""),
            [redTeamName]: Array(5).fill(""),
          },
          pick: {
            [blueTeamName]: Array(5).fill(""),
            [redTeamName]: Array(5).fill(""),
          },
          startedAt: null,
          commited: {
            [blueTeamName]: false,
            [redTeamName]: false,
          },
          actionLog: [],
        },
        winners: [],
      },
      finished: false,
    });
  }
}
