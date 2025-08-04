import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useQueries } from "@tanstack/react-query";
import { fetchBanPickBySet } from "@/apis/service/fetchBanPickBySet";
import {
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface HistoryModalProps {
  matchId: string;
  currentSet: number;
  currentStep: number;
  teamName: string;
  oppositeTeam: string;
  open: boolean;
  onClose: () => void;
  version: string;
  winners: string[];
}

const HistoryModal = ({
  matchId,
  currentSet,
  currentStep,
  teamName,
  oppositeTeam,
  open,
  onClose,
  version,
  winners,
}: HistoryModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isCurrentSetFinished = currentStep === 21;

  const queries = useQueries({
    queries: Array.from(
      { length: isCurrentSetFinished ? currentSet : currentSet - 1 },
      (_, i) => {
        const setNum = i + 1;
        return {
          queryKey: ["banPickSet", matchId, setNum],
          queryFn: () =>
            fetchBanPickBySet(matchId, setNum, teamName, oppositeTeam),
          staleTime: Infinity,
        };
      }
    ),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        isFullscreen={isFullscreen}
        showCloseButton={false}
        className="bg-neutral-900 border border-neutral-700 text-white overflow-auto z-100"
      >
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle className="text-lg md:text-xl">
              밴픽 기록판
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 text-sm">
              이전 세트의 밴픽 기록을 확인할 수 있습니다.
            </DialogDescription>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded hover:bg-gray-700"
              aria-label={isFullscreen ? "작게 보기" : "전체 보기"}
              type="button"
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="h-6 w-6 text-white" />
              ) : (
                <ArrowsPointingOutIcon className="h-6 w-6 text-white" />
              )}
            </button>

            <DialogClose asChild>
              <button
                className="p-1 rounded hover:bg-gray-700"
                aria-label="닫기"
                type="button"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </DialogClose>
          </div>
        </div>

        <div className="mt-4 text-sm space-y-6">
          {isLoading && <p className="text-gray-300">불러오는 중...</p>}
          {isError && (
            <p className="text-rose-400">데이터를 불러오는데 실패했습니다.</p>
          )}

          {!isLoading &&
            !isError &&
            queries.map((q, idx) => {
              const data = q.data;
              if (!data) return null;

              const { teams, banPickByTeam } = data;
              const orderedTeams = [teamName, oppositeTeam];
              const winner = winners?.[idx];

              return (
                <div key={idx}>
                  <h2 className="font-bold text-base text-white mb-2">
                    {idx + 1} 세트
                  </h2>

                  <div
                    className={cn(
                      "flex flex-col gap-4",
                      isFullscreen && "sm:flex-row sm:items-start"
                    )}
                  >
                    {orderedTeams.map((team) => {
                      const isWinner = team === winner;
                      return (
                        <div
                          key={team}
                          className={cn(
                            "border p-4 rounded bg-neutral-800 relative w-full",
                            isFullscreen && "sm:w-1/2",
                            isWinner
                              ? "border-yellow-400 shadow-md shadow-yellow-400/30"
                              : "border-neutral-700"
                          )}
                        >
                          <h3 className="text-sm font-semibold mb-3 text-white flex items-center gap-2">
                            {team === teams.blue ? "🟦" : "🟥"} {team}
                            {isWinner && (
                              <span className="text-yellow-400 text-xs font-bold ml-1">
                                승리
                              </span>
                            )}
                          </h3>

                          <div className="flex items-center mb-2 gap-2">
                            <span className="text-sm text-gray-400 w-10">
                              PICK
                            </span>
                            <div className="flex gap-2 flex-wrap">
                              {banPickByTeam[team].pick.map((champId) => (
                                <img
                                  key={champId}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                                  alt={champId}
                                  className="w-9 h-9 object-cover rounded border border-neutral-600"
                                  title={champId}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 w-10">
                              BAN
                            </span>
                            <div className="flex gap-2 flex-wrap">
                              {banPickByTeam[team].ban.map((champId) => (
                                <img
                                  key={champId}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                                  alt={champId}
                                  className="w-9 h-9 object-cover rounded border border-neutral-600"
                                  title={champId}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        <button
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
          onClick={onClose}
          type="button"
        >
          닫기
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
