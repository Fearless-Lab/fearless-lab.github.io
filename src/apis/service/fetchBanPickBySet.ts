import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export interface TeamBanPick {
  ban: string[];
  pick: string[];
}

export type BanPickByTeam = {
  [teamName: string]: TeamBanPick;
};

export interface BanPickSetData {
  teams: {
    blue: string;
    red: string;
  };
  banPickByTeam: BanPickByTeam;
}

export const fetchBanPickBySet = async (
  matchId: string,
  setNumber: number,
  teamName: string,
  oppositeTeam: string
): Promise<BanPickSetData | null> => {
  const matchDocRef = doc(db, "banPickSimulations", matchId);
  const docSnap = await getDoc(matchDocRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  const setData = data.sets?.[setNumber];
  if (!setData || !setData.ban || !setData.pick || !setData.teams) return null;

  return {
    teams: {
      blue: setData.teams.blue,
      red: setData.teams.red,
    },
    banPickByTeam: {
      [teamName]: {
        ban: setData.ban[teamName] || [],
        pick: setData.pick[teamName] || [],
      },
      [oppositeTeam]: {
        ban: setData.ban[oppositeTeam] || [],
        pick: setData.pick[oppositeTeam] || [],
      },
    },
  };
};
