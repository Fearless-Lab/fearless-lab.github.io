import { useMemo, useCallback } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface UseBanPickInitOptions {
  matchId: string;
  teamName: string;
  initialTeam: "blue" | "red";
}

export const useBanPickInit = ({
  matchId,
  teamName,
  initialTeam,
}: UseBanPickInitOptions) => {
  const docRef = useMemo(
    () => doc(db, "banPickSimulations", matchId),
    [matchId]
  );

  // 양쪽 팀의 준비 완료 상태를 실시간으로 감지하는 함수
  const subscribeToStart = useCallback(
    (onReady: () => void) => {
      return onSnapshot(docRef, async (snapshot) => {
        const data = snapshot.data();
        if (!data) return;

        const currentSet = data.currentSet;
        const setData = data.sets?.[currentSet];
        if (!setData) return;

        const started = setData.started;
        const bothReady =
          started.blueTeam === "ready" && started.redTeam === "ready";

        const finished = data.finished === true;

        if (bothReady || finished) onReady();
      });
    },
    [docRef]
  );

  // 시뮬레이션 문서의 모든 변경을 실시간으로 감지하고 처리할 수 있도록 돕는 함수
  const subscribeToSimulationDoc = useCallback(
    (callback: (data: any) => void) => {
      return onSnapshot(docRef, (snapshot) => {
        const data = snapshot.data();
        if (!data) return;
        callback(data);
      });
    },
    [docRef]
  );

  const markAsReady = useCallback(async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const currentSet = data?.currentSet;
    if (!data || currentSet == null) return;

    let teamKey: "blueTeam" | "redTeam";
    let teamSide: "blue" | "red";

    if (currentSet === 1) {
      // 1세트일 때는 initialTeam 기준
      teamSide = initialTeam;
    } else {
      // 2세트 이후는 teams 정보 기준
      const currentTeams = data.sets?.[currentSet]?.teams;
      if (!currentTeams) return;

      if (currentTeams.blue === teamName) {
        teamSide = "blue";
      } else if (currentTeams.red === teamName) {
        teamSide = "red";
      } else {
        console.warn("teamName이 현재 세트의 팀 정보에 없습니다.");
        return;
      }
    }

    teamKey = teamSide === "blue" ? "blueTeam" : "redTeam";

    await updateDoc(docRef, {
      [`sets.${currentSet}.started.${teamKey}`]: "ready",
      [`sets.${currentSet}.teams.${teamSide}`]: teamName,
    });
  }, [docRef, initialTeam, teamName]);

  return {
    subscribeToStart,
    markAsReady,
    subscribeToSimulationDoc,
  };
};
