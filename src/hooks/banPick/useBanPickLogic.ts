import { useEffect, useState, useCallback } from "react";
import { useBanPickInit } from "@/hooks/banPick/useBanPickInit";
import { useBanPickController } from "./useBanPickController";

interface Teams {
  blue: string;
  red: string;
}

interface UseBanPickLogicOptions {
  matchId: string;
  teamName: string;
  oppositeTeam: string;
  mode: string;
  initialTeam: "blue" | "red";
}

export const useBanPickLogic = ({
  matchId,
  teamName,
  oppositeTeam,
  mode,
  initialTeam,
}: UseBanPickLogicOptions) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [teams, setTeams] = useState<Teams | null>(null);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  // 선택 상태 (각 팀 별 챔피언 선택 기록)
  const [localBan, setLocalBan] = useState<string[]>([]);
  const [localPick, setLocalPick] = useState<string[]>([]);
  const [enemyBan, setEnemyBan] = useState<string[]>([]);
  const [enemyPick, setEnemyPick] = useState<string[]>([]);

  // 선택 불가 챔피언 상태
  const [currentSetSelections, setCurrentSetSelections] = useState<Set<string>>(
    new Set()
  );
  const [previousPicks, setPreviousPicks] = useState<Set<string>>(new Set());

  // 다음 세트 셋업 준비 중인지 확인
  const [isNextSetPreparing, setIsNextSetPreparing] = useState(false);

  const {
    initializeDoc,
    subscribeToStart,
    markAsReady,
    getCurrentTeams,
    subscribeToSimulationDoc,
  } = useBanPickInit({
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
  });

  const { setStartedAtIfNeeded } = useBanPickController(matchId);

  // Firestore 문서 초기화 + 팀 정보 불러오기
  useEffect(() => {
    if (!matchId) return;

    const initAndFetchTeams = async () => {
      try {
        await initializeDoc();
        const data = await getCurrentTeams();
        if (data) {
          setTeams(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initAndFetchTeams();
  }, [matchId, initializeDoc, getCurrentTeams]);

  // 준비 완료 → 모달 닫기
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToStart(() => {
      setIsModalOpen(false);
    });

    return () => unsubscribe();
  }, [matchId, subscribeToStart]);

  // 실시간 동기화: set, step, startedAt, ban/pick + currentSet 변경 감지 시 모달 열기 및 teams 업데이트
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToSimulationDoc((data) => {
      if (!data || data.currentSet === undefined) return;

      const currentSetIndex = data.currentSet;
      const setData = data.sets?.[currentSetIndex];
      if (!setData) return;

      setCurrentSet((prev) => {
        if (prev !== currentSetIndex) {
          // 세트가 바뀌면 모달 다시 열고 준비 상태 초기화
          setIsModalOpen(true);
          setIsReady(false);
          return currentSetIndex;
        }
        return prev;
      });

      // teams 업데이트
      if (setData.teams) {
        setTeams(setData.teams);
      }

      // currentStep 변경
      const newStep = setData.currentStep;
      if (newStep !== undefined) {
        setCurrentStep((prev) => (prev !== newStep ? newStep : prev));
      }

      // startedAt 변경
      const newStartedAt = setData.startedAt;
      if (newStartedAt) {
        setStartedAt(
          newStartedAt.toDate ? newStartedAt.toDate() : new Date(newStartedAt)
        );
      } else {
        setStartedAt(null);
      }

      // ban/pick 동기화
      const myBan = setData.ban?.[teamName];
      const myPick = setData.pick?.[teamName];
      const oppBan = setData.ban?.[oppositeTeam];
      const oppPick = setData.pick?.[oppositeTeam];

      setLocalBan(myBan);
      setLocalPick(myPick);
      setEnemyBan(oppBan);
      setEnemyPick(oppPick);

      // 해당 세트 누적 밴픽
      const allSelections = [...myBan, ...myPick, ...oppBan, ...oppPick];
      setCurrentSetSelections(new Set(allSelections));

      // 이전 픽들 누적
      const totalPickSet = new Set<string>();

      const myTotalPicks = data.total?.[teamName];
      const oppTotalPicks = data.total?.[oppositeTeam];

      if (mode === "fearless") {
        myTotalPicks.forEach((champ: string) => {
          if (champ) totalPickSet.add(champ);
        });
      } else if (mode === "hardFearless") {
        [...myTotalPicks, ...oppTotalPicks].forEach((champ) => {
          if (champ) totalPickSet.add(champ);
        });
      }

      setPreviousPicks(totalPickSet);

      setIsNextSetPreparing(data.isNextSetPreparing);
    });

    return () => unsubscribe();
  }, [matchId, subscribeToSimulationDoc, teamName, oppositeTeam]);

  // 준비 완료 버튼 클릭 시
  const handleReady = useCallback(async () => {
    if (isReady) return;

    try {
      await markAsReady();
      setIsReady(true);

      await setStartedAtIfNeeded();
    } catch (e) {
      console.error(e);
      alert("준비 상태 갱신에 실패했습니다.");
    }
  }, [isReady, markAsReady]);

  return {
    isModalOpen,
    isReady,
    teams,
    currentSet,
    currentStep,
    startedAt,
    handleReady,
    localBan,
    localPick,
    setLocalBan,
    setLocalPick,
    enemyBan,
    enemyPick,
    currentSetSelections,
    previousPicks,
    isNextSetPreparing,
  };
};
