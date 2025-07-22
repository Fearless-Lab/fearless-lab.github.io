import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBanPickInit } from "@/hooks/banPick/useBanPickInit";

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
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

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

  // 404 리다이렉트
  useEffect(() => {
    if (!matchId || !teamName) {
      navigate("/404");
    }
  }, [matchId, teamName, navigate]);

  // Firestore 문서 초기화 후 팀 정보 불러오기 (순서 보장)
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

  // 준비 완료 구독해서 모달 닫기
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToStart(() => {
      setIsModalOpen(false);
    });

    return () => unsubscribe();
  }, [matchId, subscribeToStart]);

  // currentSet, currentStep, startedAt 실시간 구독
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToSimulationDoc((data) => {
      if (!data) return;

      if (data.currentSet !== undefined) {
        setCurrentSet((prev) =>
          prev !== data.currentSet ? data.currentSet : prev
        );
      }

      const newStep = data.sets?.[data.currentSet]?.currentStep;
      if (newStep !== undefined) {
        setCurrentStep((prev) => (prev !== newStep ? newStep : prev));
      }

      const newStartedAt = data.sets?.[data.currentSet]?.startedAt;
      if (newStartedAt) {
        setStartedAt(
          newStartedAt.toDate ? newStartedAt.toDate() : new Date(newStartedAt)
        );
      } else {
        setStartedAt(null);
      }
    });

    return () => unsubscribe();
  }, [matchId, subscribeToSimulationDoc]);

  // 준비 완료 처리 함수
  const handleReady = useCallback(async () => {
    if (isReady) return;

    try {
      await markAsReady();
      setIsReady(true);
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
  };
};
