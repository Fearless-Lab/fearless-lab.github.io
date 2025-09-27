import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

type VerifyParams = {
  matchId: string;
  teamName: string;
  oppositeTeam: string;
  mode: string;
  initialTeam: "blue" | "red";
  isGuest: boolean;
};

export function useVerifyBanPickRoom({
  matchId,
  teamName,
  oppositeTeam,
  mode,
  initialTeam,
  isGuest,
}: VerifyParams) {
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    const verifyDoc = async () => {
      const docRef = doc(db, "banPickSimulations", matchId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setIsValid(false);
        return;
      }

      const data = docSnap.data();
      const { mode: savedMode, sets } = data;
      const firstSet = sets?.[1];
      if (!firstSet?.teams) {
        setIsValid(false);
        return;
      }

      const { blue, red } = firstSet.teams as { blue: string; red: string };

      const checks: boolean[] = [];

      checks.push(savedMode === mode);

      if (isGuest) {
        const validTeamNames =
          (blue === teamName && red === oppositeTeam) ||
          (red === teamName && blue === oppositeTeam);
        checks.push(validTeamNames);
      } else {
        if (initialTeam === "blue") {
          checks.push(blue === teamName && red === oppositeTeam);
        } else {
          checks.push(red === teamName && blue === oppositeTeam);
        }
      }
      setIsValid(checks.every(Boolean));
    };

    verifyDoc();
  }, [matchId, teamName, oppositeTeam, mode, initialTeam, isGuest]);

  return isValid;
}
