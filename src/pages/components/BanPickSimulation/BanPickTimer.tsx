import { useEffect, useRef, type RefObject } from "react";
import { PHASE } from "@constants/banPick";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import type { Champion } from "@/utils/generateRandomNickname";
import { getServerNow } from "@/utils/serverTime";
import { useBanPickTimerStore } from "@/store/banPickTimerStore";

interface BanPickTimerProps {
  matchId: string;
  startedAt: Date | null;
  currentStep: number | null;
  currentSetSelections: Set<string>;
  previousPicks: Set<string>;
  champions: Champion[];
  teamName: string;
  isMyTurn: Boolean;
  isSwapPhase: Boolean;
  isGuest: Boolean;
  isUnlimited: boolean;
  previewChamp: string;
  lockedStepRef: RefObject<number | null>;
}

const EXTRA_DELAY = 2; // 0초 이후 추가 대기 시간
const UNLIMITED_DURATION = 999999999; // 단판(시간 제한 없음) 모드의 단계별 제한 시간

const BanPickTimer = ({
  matchId,
  startedAt,
  currentStep,
  currentSetSelections,
  previousPicks,
  champions,
  teamName,
  isMyTurn,
  isSwapPhase,
  isGuest,
  isUnlimited,
  previewChamp,
  lockedStepRef,
}: BanPickTimerProps) => {
  const { remainingTime, setRemainingTime, isMuted } = useBanPickTimerStore();

  const {
    commitAndAdvance,
    goToNextStep,
    commitTotalPickIfNeeded,
    commitSwapConfirm,
  } = useBanPickController(matchId);

  const calledRef = useRef(false);
  const lastStepRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // setInterval 클로저에서 항상 최신 선택을 읽기 위한 ref
  const previewChampRef = useRef(previewChamp);
  previewChampRef.current = previewChamp;

  const getRandomSelectableChampion = () => {
    const bannedOrPicked = new Set([...currentSetSelections, ...previousPicks]);
    const selectableChampions = champions
      .map((c) => c.id)
      .filter((champId) => !bannedOrPicked.has(champId));

    const randomIndex = Math.floor(Math.random() * selectableChampions.length);
    return selectableChampions[randomIndex];
  };

  const prevRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startedAt || currentStep === null || currentStep >= PHASE.length)
      return;

    if (lastStepRef.current !== currentStep) {
      calledRef.current = false;
      lastStepRef.current = currentStep;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/drum.mp3");
      audioRef.current.volume = 0.1;
    }

    const interval = setInterval(() => {
      const elapsed = (getServerNow() - startedAt.getTime()) / 1000;
      const duration = isUnlimited
        ? UNLIMITED_DURATION
        : PHASE[currentStep].duration;

      const actualRemaining = Math.max(duration + EXTRA_DELAY - elapsed, 0);

      const displayRemaining = Math.max(duration - elapsed, 0);
      const rounded = Math.round(displayRemaining);

      if (prevRef.current !== rounded) {
        prevRef.current = rounded;
        setRemainingTime(rounded);

        if (!isMuted && rounded >= 0 && rounded <= 10 && isMyTurn) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }
      }

      if (!isGuest && actualRemaining <= 0.05 && !calledRef.current) {
        // 확정 요청이 처리 중이면 랜덤 픽으로 덮어쓰지 않도록 대기 (실패 시 잠금이 풀리면 이어서 처리)
        if (isMyTurn && lockedStepRef.current === currentStep) return;

        calledRef.current = true;

        if (isMyTurn) {
          // 밴은 선택 중인 챔피언으로 확정, 픽은 확정하지 않았으면 랜덤
          const isBan = PHASE[currentStep].type === "ban";

          lockedStepRef.current = currentStep;

          commitAndAdvance(
            teamName,
            isBan ? previewChampRef.current : getRandomSelectableChampion(),
            isBan ? "ban" : "pick",
            currentStep
          ).catch((e) => {
            console.error(e);
            calledRef.current = false;
            lockedStepRef.current = null;
          });
        }

        if (isSwapPhase) {
          commitSwapConfirm(teamName);
          commitTotalPickIfNeeded(teamName);
          goToNextStep(currentStep);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [startedAt, currentStep, isMuted, isUnlimited]);

  if (!startedAt || currentStep === null || currentStep >= PHASE.length)
    return <div className="text-xl font-bold">--</div>;

  if (isUnlimited)
    return <div className="text-3xl font-bold text-white">--:--</div>;

  return (
    <div className="relative inline-block text-3xl font-bold text-white">
      :{remainingTime}
      {remainingTime <= 10 && (
        <span
          key={remainingTime}
          className="absolute top-0 left-0 right-0 text-red-400 font-bold animate-ghost-pop"
        >
          :{remainingTime}
        </span>
      )}
    </div>
  );
};

export default BanPickTimer;
