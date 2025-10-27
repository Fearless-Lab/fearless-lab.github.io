import type { Phase } from "@constants/banPick";
import { convertTypeToKo } from "./convertTypeToKo";

interface GetActionTextOptions {
  phase: Phase;
  isGuest: boolean;
  commited: boolean;
  finished: boolean;
  isSwapPhase: boolean;
  isGameEnd: boolean;
  isMyTurn: boolean;
}

export function getActionText({
  phase,
  isGuest,
  commited,
  finished,
  isSwapPhase,
  isGameEnd,
  isMyTurn,
}: GetActionTextOptions): string {
  if (isGuest) {
    if (finished) return "경기가 종료되었습니다";
    if (isGameEnd) return "패배팀 투표 중입니다";
    if (isSwapPhase) return "스왑 중입니다";
    return "관전 중입니다";
  }

  if (finished)
    return "경기가 종료되었습니다.\n기록판을 참고해 전략을 세워보세요!";
  if (isGameEnd) return "패배 팀 투표하기";
  if (isSwapPhase)
    return commited
      ? "상대팀이 아직 스왑 진행 중이에요"
      : convertTypeToKo("swap");
  if (isMyTurn) return convertTypeToKo(phase?.type);
  return "상대 차례입니다";
}
