import {
  ChevronDoubleRightIcon,
  // NoSymbolIcon,
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
import { PHASE } from "@constants/banPick";
import { useChampions } from "@/hooks/banPick/useChampions";
import BanArea from "./components/BanPickSimulation/BanArea";
import PickColumn from "./components/BanPickSimulation/PickColumn";
import CommitButton from "./components/BanPickSimulation/CommitButton";
import NextSetModal from "./components/BanPickSimulation/NextSetModal";
import HistoryModal from "./components/BanPickSimulation/HistoryModal";
import { positions, positionMap, type Position } from "@constants/positions";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import BanOverviewModal from "./components/BanPickSimulation/BanOverviewModal";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/16/solid";
import MuteToggleButton from "./components/BanPickSimulation/MuteToggleButton";
import VideoGallery from "./components/BanPickSimulation/VideoGallery";
import { useLocation } from "react-router-dom";
import LandingPage from "./components/BanPickSimulation/LandingPage";
import BanPickFlowModal from "./components/BanPickSimulation/BanPickFlowModal";
import ChampNoteModal from "./components/BanPickSimulation/ChampNoteModal";
import { useVerifyBanPickRoom } from "@/hooks/banPick/useVerifyBanPickRoom";
import Loading from "./components/BanPickSimulation/Loading";
import ErrorPage from "./components/BanPickSimulation/ErrorPage";

const BanPickSimulation = () => {
  const location = useLocation();
  if (!location.search) return <LandingPage />;

  const query = getBanPickQueryParams();
  if (query.isError) return <ErrorPage />;

  const { matchId, teamName, oppositeTeam, mode, initialTeam, isGuest } = query;

  const isValid = useVerifyBanPickRoom({
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
    isGuest,
  });

  const { champions, version } = useChampions(isValid === true);

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

  const checkTeam = () => {
    if (teams?.blue === teamName) return "blue";
    else if (teams?.red === teamName) return "red";
  };

  const convertTypeToKo = (type: string) => {
    if (type === "pick") return "챔피언 선택";
    else if (type === "ban") return "챔피언 금지";
    else if (type === "swap")
      return "드래그로 순서를 정한 뒤, 버튼을 눌러 확정해주세요";
    else return "대기 중";
  };

  const myTeam = checkTeam();
  const phase = PHASE[currentStep];
  const isSwapPhase = phase?.type === "swap";
  const isGameEnd = currentStep === 21;

  const isMyTurn = !isSwapPhase && phase?.team === myTeam;

  let actionText = "상대 차례입니다";

  if (isGuest) {
    if (finished) actionText = "경기가 종료되었습니다";
    else if (currentStep === 21) {
      actionText = "패배팀 투표 중입니다";
    } else if (isSwapPhase) {
      actionText = "스왑 중입니다";
    } else {
      actionText = "관전 중입니다";
    }
  } else {
    if (finished)
      actionText =
        "5세트까지 진행되었습니다.\n기록판을 참고해 전략을 세워보세요!";
    else if (currentStep === 21) {
      actionText = "패배 팀 투표하기";
    } else if (isSwapPhase) {
      if (commited) actionText = "상대팀이 아직 스왑 진행 중이에요";
      else actionText = convertTypeToKo("swap");
    } else if (isMyTurn) {
      actionText = convertTypeToKo(PHASE[currentStep]?.type);
    }
  }

  const isCommitButtonDisabled = isGameEnd
    ? false
    : (!isMyTurn && !isSwapPhase) || commited || (finished && !isSwapPhase);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBanPickFlowOpen, setIsBanPickFlowOpen] = useState(false);
  const [isBanOverviewOpen, setIsBanOverviewOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredByPosition = selectedPosition
    ? champions.filter((champ) => positionMap[selectedPosition].has(champ.name))
    : champions;

  const filteredBySearch = searchTerm
    ? filteredByPosition.filter((champ) =>
        champ.name.includes(searchTerm.trim())
      )
    : filteredByPosition;

  const championGridProps: ChampionGridProps = {
    searchTerm,
    champions: filteredBySearch,
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

  // header용 점수
  const getWinsOf = (name?: string) =>
    name ? winners.filter((w) => w === name).length : 0;

  const blueScore = getWinsOf(teams?.blue);
  const redScore = getWinsOf(teams?.red);

  if (isValid === null) return <Loading />;
  if (!isValid) return <ErrorPage />;

  return (
    <>
      <div className="flex flex-col mt-22">
        <div className="flex flex-col w-full max-w-6xl mx-auto px-4 text-xs md:text-base">
          <div className="flex w-full h-[10vh] max-h-[90px] rounded-tl-md rounded-tr-md overflow-hidden">
            <div className="flex-1 bg-gradient-to-l from-blue-400/40 via-blue-500/50 to-blue-700/60 backdrop-blur-md border border-white/10 shadow-lg text-md md:text-lg text-white flex items-center justify-between font-bold px-4">
              <span>{teams ? teams.blue : "팀 정보 불러오는중"}</span>
              <span className="text-[#b99504] text-xl md:text-2xl">
                {blueScore}
              </span>
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

                {/* {mode !== "normal" && (
                  <NoSymbolIcon
                    className="w-5 h-5 text-rose-400 cursor-pointer hover:text-gray-300"
                    onClick={() => setIsBanOverviewOpen(true)}
                  />
                )} */}

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
              <span className="text-[#b99504] text-xl md:text-2xl">
                {redScore}
              </span>
              <span>{teams ? teams.red : "팀 정보 불러오는중"}</span>
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
