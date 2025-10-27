import type { Champion } from "@/utils/fetchChampions";
import { PHASE } from "@constants/banPick";
import { positionMap, type Position } from "@constants/positions";

interface GetBanPickDerivedStateOptions {
  champions: Champion[];
  selectedPosition: Position | null;
  searchTerm: string;
  currentStep: number;
  commited: boolean;
  finished: boolean;
  myTeam?: "blue" | "red";
}

export function getBanPickDerivedState({
  champions,
  selectedPosition,
  searchTerm,
  currentStep,
  commited,
  finished,
  myTeam,
}: GetBanPickDerivedStateOptions) {
  let filtered = champions;

  if (selectedPosition) {
    filtered = filtered.filter((champ) =>
      positionMap[selectedPosition].has(champ.name)
    );
  }
  if (searchTerm) {
    filtered = filtered.filter((champ) =>
      champ.name.includes(searchTerm.trim())
    );
  }

  const phase = PHASE[currentStep];
  const isSwapPhase = phase?.type === "swap";
  const isGameEnd = currentStep === 21;
  const isMyTurn = !isSwapPhase && phase?.team === myTeam;

  const isCommitButtonDisabled = isGameEnd
    ? false
    : (!isMyTurn && !isSwapPhase) || commited || (finished && !isSwapPhase);

  return {
    filteredChampions: filtered,
    phase,
    isSwapPhase,
    isGameEnd,
    isMyTurn,
    isCommitButtonDisabled,
  };
}
