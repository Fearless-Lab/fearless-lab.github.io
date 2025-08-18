import { useEffect, useState, useCallback } from "react";
import { useBanPickInit } from "@/hooks/banPick/useBanPickInit";
import { useBanPickController } from "./useBanPickController";
import { initServerOffset } from "@/utils/serverTime";

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
  useEffect(() => {
    initServerOffset();
  }, []);

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

  // 소프트 피어리스 모드의 밴 페이즈에서 비활성 여부 체크하기 위한 상태
  // 상대가 사용한 챔피언이면 밴페이즈에서 비활성화
  const [oppoPreviousPicks, setOppoPreviousPicks] = useState<Set<string>>(
    new Set()
  );

  // 다음 세트 셋업 준비 중인지 확인
  const [isNextSetPreparing, setIsNextSetPreparing] = useState(false);

  // 승리 팀 Array
  const [winners, setWinners] = useState<string[]>([]);

  // 5세트까지 진행됐는지
  const [finished, setFinished] = useState(false);

  // 라인별 정렬하고 완료했는지
  const [commited, setCommited] = useState(false);

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

  const { setStartedAtIfNeeded, forceNextStepIfBothCommited } =
    useBanPickController(matchId);

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

  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToSimulationDoc((data) => {
      if (!data || data.currentSet === undefined) return;

      const currentSetIndex = data.currentSet;
      const setData = data.sets?.[currentSetIndex];
      if (!setData) return;

      setCurrentSet((prev) => {
        const isGameOver = currentSetIndex === 5 && setData.currentStep === 21;
        const isSetChanged = prev !== currentSetIndex;
        const hasStartedAlready = !!setData.startedAt;

        if (isSetChanged && !isGameOver && !hasStartedAlready) {
          setIsModalOpen(true);
          setIsReady(false);
        }

        return currentSetIndex;
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
      const allSelections = new Set(
        [myBan, myPick, oppBan, oppPick].flat().filter(Boolean)
      );
      // flat : 배열 안의 배열을 1단계 풀어서 평탄화(flatten) 하는 메서드

      setCurrentSetSelections(new Set(allSelections));

      // 이전 픽들 누적
      const myTotalPicks: string[] = data.total?.[teamName] ?? [];
      const oppTotalPicks: string[] = data.total?.[oppositeTeam] ?? [];

      let picksToSet = new Set<string>();

      if (mode === "fearless") {
        picksToSet = new Set(myTotalPicks);
      } else if (mode === "hardFearless") {
        picksToSet = new Set([...myTotalPicks, ...oppTotalPicks]);
      }

      setPreviousPicks(picksToSet);

      // 소프트 피어리스의 경우 상대가 사용했던 챔피언이면 밴 때도 비활성화
      const oppSet = new Set(oppTotalPicks);
      setOppoPreviousPicks(oppSet);

      setIsNextSetPreparing(data.isNextSetPreparing);
      setWinners(data.winners ?? []);
      setFinished(!!data.finished);
      setCommited(setData.commited?.[teamName] ?? false);

      if (setData.commited?.[teamName] && setData.commited?.[oppositeTeam]) {
        forceNextStepIfBothCommited();
      }
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
    oppoPreviousPicks,
    isNextSetPreparing,
    winners,
    finished,
    commited,
  };
};
