import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [teams, setTeams] = useState<Teams | null>(null);
  const [currentSet, setCurrentSet] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  // 선택 상태 (각 팀 별 챔피언 선택 기록)
  const [localBan, setLocalBan] = useState<string[]>([]);
  const [localPick, setLocalPick] = useState<string[]>([]);
  const [enemyBan, setEnemyBan] = useState<string[]>([]);
  const [enemyPick, setEnemyPick] = useState<string[]>([]);

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

  // 잘못된 접근 시 404로 리다이렉트
  useEffect(() => {
    if (!matchId || !teamName) {
      navigate("/404");
    }
  }, [matchId, teamName, navigate]);

  // Firestore 문서 초기화 + 팀 정보 불러오기
  useEffect(() => {
    if (!matchId || !teamName) return;

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
  }, [matchId, teamName, initializeDoc, getCurrentTeams]);

  // 준비 완료 → 모달 닫기
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToStart(() => {
      setIsModalOpen(false);
    });

    return () => unsubscribe();
  }, [matchId, subscribeToStart]);

  // 실시간 동기화: set, step, startedAt, ban/pick
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToSimulationDoc((data) => {
      if (!data || data.currentSet === undefined) return;

      const currentSetIndex = data.currentSet;
      const setData = data.sets?.[currentSetIndex];
      if (!setData) return;

      // currentSet 변경
      setCurrentSet((prev) =>
        prev !== currentSetIndex ? currentSetIndex : prev
      );

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
      console.log(localBan, localPick);
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
  };
};
