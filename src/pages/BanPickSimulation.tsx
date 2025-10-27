import {
  ChevronDoubleRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import PositionRow from "./components/BanPickSimulation/PositionRow";
import { Input } from "@/components/ui/input";
import ChampionGrid, {
  type ChampionGridProps,
} from "./components/BanPickSimulation/ChampionGrid";
import ReadyCheckModal from "./components/BanPickSimulation/ReadyCheckModal";
import { useBanPickLogic } from "@/hooks/banPick/useBanPickLogic";
import { getBanPickQueryParams } from "@/utils/getQueryParams";
import BanPickTimer from "./components/BanPickSimulation/BanPickTimer";
import { useState } from "react";
import { useChampions } from "@/hooks/banPick/useChampions";
import BanArea from "./components/BanPickSimulation/BanArea";
import PickColumn from "./components/BanPickSimulation/PickColumn";
import CommitButton from "./components/BanPickSimulation/CommitButton";
import NextSetModal from "./components/BanPickSimulation/NextSetModal";
import HistoryModal from "./components/BanPickSimulation/HistoryModal";
import { positions, type Position } from "@constants/positions";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import BanOverviewModal from "./components/BanPickSimulation/BanOverviewModal";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/16/solid";
import MuteToggleButton from "./components/BanPickSimulation/MuteToggleButton";
import VideoGallery from "./components/BanPickSimulation/VideoGallery";
import LandingPage from "./components/BanPickSimulation/LandingPage";
import BanPickFlowModal from "./components/BanPickSimulation/BanPickFlowModal";
import ChampNoteModal from "./components/BanPickSimulation/ChampNoteModal";
import { useVerifyBanPickRoom } from "@/hooks/banPick/useVerifyBanPickRoom";
import Loading from "./components/BanPickSimulation/Loading";
import ErrorPage from "./components/BanPickSimulation/ErrorPage";
import { checkTeam } from "@/helper/banPickSimulation/checkTeam";
import { getTeamScores } from "@/helper/banPickSimulation/getTeamScores";
import { getActionText } from "@/helper/banPickSimulation/getActionText";
import { getBanPickDerivedState } from "@/helper/banPickSimulation/getBanPickDerivedState";
import { SeriesScore } from "./components/BanPickSimulation/SeriesScore";

const BanPickSimulation = () => {
  const query = getBanPickQueryParams();
  if (query.isEmpty) return <LandingPage />;
  if (query.isError) return <ErrorPage />;

  const {
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
    isGuest,
    bestOf,
  } = query;

  const isValid = useVerifyBanPickRoom({
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
    isGuest,
  });

  const { champions, version } = useChampions();

  const {
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
  } = useBanPickLogic({
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
  });

  const { commitSwapOrder } = useBanPickController(matchId);

  // 로컬 UI 상태
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBanPickFlowOpen, setIsBanPickFlowOpen] = useState(false);
  const [isBanOverviewOpen, setIsBanOverviewOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // 팀 판별
  const myTeam = checkTeam(teams ?? undefined, teamName);

  // 파생 상태 계산 (챔피언 필터링, 단계, 스왑 등)
  const {
    filteredChampions,
    phase,
    isSwapPhase,
    isGameEnd,
    isMyTurn,
    isCommitButtonDisabled,
  } = getBanPickDerivedState({
    champions,
    selectedPosition,
    searchTerm,
    currentStep,
    commited,
    finished,
    myTeam,
  });

  // 액션 문구 계산
  const actionText = getActionText({
    phase,
    isGuest,
    commited,
    finished,
    isSwapPhase,
    isGameEnd,
    isMyTurn,
  });

  // 점수 계산
  const { blue: blueScore, red: redScore } = getTeamScores(
    winners,
    teams ?? undefined
  );

  // 챔피언 그리드 props 구성
  const championGridProps: ChampionGridProps = {
    searchTerm,
    champions: filteredChampions,
    version,
    currentStep,
    myTeam,
    localBan,
    localPick,
    setLocalBan,
    setLocalPick,
    currentSetSelections,
    previousPicks,
    mode,
    oppoPreviousPicks,
    isGuest,
  };

  const handleSwap = (newOrder: (string | undefined)[]) => {
    const cleanedOrder = newOrder.filter(Boolean) as string[];
    commitSwapOrder(teamName, cleanedOrder);
  };

  if (isValid === null) return <Loading />;
  if (!isValid) return <ErrorPage />;

  return (
    <>
      <div className="flex flex-col mt-22">
        <div className="flex flex-col w-full max-w-6xl mx-auto px-4 text-xs md:text-base">
          <div className="flex w-full h-[10vh] max-h-[90px] rounded-tl-md rounded-tr-md overflow-hidden">
            <div className="flex-1 bg-gradient-to-l from-blue-400/40 via-blue-500/50 to-blue-700/60 backdrop-blur-md border border-white/10 shadow-lg text-md md:text-lg text-white flex items-center justify-between font-bold px-4">
              <span>{teams!.blue}</span>
              <SeriesScore wins={blueScore} bestOf={bestOf} />
            </div>
            <div className="w-28 bg-black text-white flex flex-col items-center justify-center font-mono font-semibold text-sm md:text-lg relative">
              {startedAt && (
                <BanPickTimer
                  matchId={matchId}
                  startedAt={startedAt}
                  currentStep={currentStep}
                  currentSetSelections={currentSetSelections}
                  previousPicks={previousPicks}
                  champions={champions}
                  teamName={teamName}
                  isMyTurn={isMyTurn}
                  isSwapPhase={isSwapPhase}
                  isGuest={isGuest}
                />
              )}
              <div className="mt-2 flex items-center gap-2">
                <DocumentTextIcon
                  className="w-5 h-5 cursor-pointer hover:text-gray-300"
                  onClick={() => setIsHistoryOpen(true)}
                />

                <ChevronDoubleRightIcon
                  className="w-5 h-5 cursor-pointer hover:text-gray-300"
                  onClick={() => setIsBanPickFlowOpen(true)}
                />

                {!isGuest && (
                  <BookOpenIcon
                    className="w-5 h-5 cursor-pointer hover:text-gray-300"
                    onClick={() => setIsNoteOpen(true)}
                  />
                )}

                {!isGuest && <MuteToggleButton />}
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-r from-rose-400/40 via-rose-500/50 to-rose-700/60 backdrop-blur-md border border-white/10 shadow-lg text-md md:text-lg text-white flex items-center justify-between font-bold px-4">
              <SeriesScore wins={redScore} bestOf={bestOf} />
              <span>{teams!.red}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <BanArea
              myTeam={myTeam}
              localBan={localBan}
              enemyBan={enemyBan}
              version={version}
              currentStep={currentStep}
              isModalOpen={isModalOpen}
            />
          </div>

          <div className="max-w-6xl mx-auto mt-2 w-full">
            <div className="hidden md:grid md:grid-cols-4 gap-12 w-full">
              <div className="md:col-span-1 border rounded-md h-[65vh] max-h-[500px] flex flex-col divide-y">
                <PickColumn
                  team="blue"
                  picks={myTeam === "blue" ? localPick : enemyPick}
                  currentStep={currentStep}
                  isSwapPhase={isSwapPhase}
                  onSwap={handleSwap}
                  myTeam={myTeam}
                  commited={commited}
                  isGuest={isGuest}
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2 px-4">
                <div className="px-4">
                  <div className="flex flex-col items-center gap-2 justify-center">
                    <PositionRow
                      selected={selectedPosition}
                      onSelect={setSelectedPosition}
                      positions={positions}
                    />

                    <div className="relative w-50">
                      <Input
                        type="text"
                        placeholder="챔피언 검색"
                        className="rounded-none border border-gray-300 pr-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={() => setSearchTerm("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-[42vh] max-h-[340px]  overflow-auto">
                  <ChampionGrid {...championGridProps} />
                </div>

                <CommitButton
                  disabled={isGuest || isCommitButtonDisabled || isModalOpen}
                  currentStep={currentStep}
                  teamName={teamName}
                  localPick={localPick}
                  localBan={localBan}
                  matchId={matchId}
                  isGameEnd={isGameEnd}
                  commited={commited}
                  finished={finished}
                  setIsHistoryOpen={setIsHistoryOpen}
                >
                  {actionText}
                </CommitButton>
              </div>

              <div className="md:col-span-1 border rounded-md h-[65vh] max-h-[500px] flex flex-col divide-y">
                <PickColumn
                  team="red"
                  picks={myTeam === "red" ? localPick : enemyPick}
                  currentStep={currentStep}
                  isSwapPhase={isSwapPhase}
                  onSwap={handleSwap}
                  myTeam={myTeam}
                  commited={commited}
                  isGuest={isGuest}
                />
              </div>
            </div>

            <div className="flex flex-col md:hidden gap-4 w-[90%] mx-auto">
              <div className="px-4 flex flex-col items-center">
                <PositionRow
                  selected={selectedPosition}
                  onSelect={setSelectedPosition}
                  positions={positions}
                />

                <div className="relative w-40 mt-4">
                  <Input
                    type="text"
                    placeholder="챔피언 검색"
                    className="rounded-none border border-gray-300 pr-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="min-h-76">
                <div className="h-76 overflow-auto">
                  <ChampionGrid {...championGridProps} />
                </div>
              </div>

              <CommitButton
                disabled={isGuest || isCommitButtonDisabled || isModalOpen}
                currentStep={currentStep}
                teamName={teamName}
                localPick={localPick}
                localBan={localBan}
                matchId={matchId}
                isGameEnd={isGameEnd}
                commited={commited}
                finished={finished}
                setIsHistoryOpen={setIsHistoryOpen}
              >
                {actionText}
              </CommitButton>

              <div className="flex w-[85%] gap-12 mx-auto">
                <div className="flex-1 border rounded-md min-h-84 flex flex-col divide-y">
                  <PickColumn
                    team="blue"
                    picks={myTeam === "blue" ? localPick : enemyPick}
                    currentStep={currentStep}
                    isSwapPhase={isSwapPhase}
                    onSwap={handleSwap}
                    myTeam={myTeam}
                    commited={commited}
                    isGuest={isGuest}
                  />
                </div>

                <div className="flex-1 border rounded-md min-h-84 flex flex-col divide-y">
                  <PickColumn
                    team="red"
                    picks={myTeam === "red" ? localPick : enemyPick}
                    currentStep={currentStep}
                    isSwapPhase={isSwapPhase}
                    onSwap={handleSwap}
                    myTeam={myTeam}
                    commited={commited}
                    isGuest={isGuest}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReadyCheckModal
          open={!isGuest && isModalOpen}
          currentSet={currentSet}
          onReadyClick={handleReady}
          isReady={isReady}
          mode={mode as "normal" | "fearless" | "hardFearless"}
          champions={champions}
          version={version}
          previousPicks={previousPicks}
          oppoPreviousPicks={oppoPreviousPicks}
        />
        <NextSetModal
          matchId={matchId}
          open={!isGuest && isNextSetPreparing && !finished}
          teamName={teamName}
          oppositeTeam={oppositeTeam}
          finished={finished}
          bestOf={bestOf}
        />
        <HistoryModal
          matchId={matchId}
          currentSet={currentSet}
          currentStep={currentStep}
          teamName={teamName}
          oppositeTeam={oppositeTeam}
          open={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          version={version}
          winners={winners}
        />
        <BanPickFlowModal
          matchId={matchId}
          currentSet={currentSet}
          currentStep={currentStep}
          open={isBanPickFlowOpen}
          onClose={() => setIsBanPickFlowOpen(false)}
          version={version}
        />
        <ChampNoteModal
          open={isNoteOpen}
          onClose={() => setIsNoteOpen(false)}
          version={version}
          previousPicks={previousPicks}
          oppoPreviousPicks={oppoPreviousPicks}
          currentSetSelections={currentSetSelections}
          mode={mode as "normal" | "fearless" | "hardFearless"}
        />
        <BanOverviewModal
          open={isBanOverviewOpen}
          onClose={() => setIsBanOverviewOpen(false)}
          mode={mode}
          matchId={matchId}
          currentSet={currentSet}
          currentStep={currentStep}
          teamName={teamName}
          oppositeTeam={oppositeTeam}
          version={version}
        />
      </div>

      <VideoGallery
        videos={[
          "https://www.youtube.com/watch?v=BKATPpLnrcE",
          "https://www.youtube.com/watch?v=LBqWADpKFRc",
          "https://www.youtube.com/watch?v=Qb_Ol3eD0hA",
          "https://www.youtube.com/watch?v=at_GgixKo5w",
          "https://www.youtube.com/watch?v=R8FNnXHGZbc",
          "https://www.youtube.com/watch?v=BkhpTA5c4Sw",
        ]}
      />
    </>
  );
};

export default BanPickSimulation;
