import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQueries } from "@tanstack/react-query";
import { fetchBanPickBySet } from "@/apis/service/fetchBanPickBySet";

interface HistoryModalProps {
  matchId: string;
  currentSet: number;
  currentStep: number;
  teamName: string;
  oppositeTeam: string;
  open: boolean;
  onClose: () => void;
  version: string;
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
}: HistoryModalProps) => {
  const isCurrentSetFinished = currentStep === 21; // 진행 중인 세트 기록은 보여주지 않기 위한 변수

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
      <DialogContent className="bg-neutral-900 border border-neutral-700 text-white w-full max-w-[calc(100%-2rem)] mx-auto max-h-[80vh] overflow-auto z-100">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg md:text-xl">밴픽 기록판</DialogTitle>
          <DialogDescription className="text-gray-400 mt-2 text-sm">
            이전 세트의 밴픽 기록을 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

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

              return (
                <div key={idx}>
                  <h2 className="font-bold text-base text-white mb-2">
                    {idx + 1} 세트
                  </h2>

                  <div className="flex flex-col gap-4">
                    {orderedTeams.map((team) => (
                      <div
                        key={team}
                        className="border border-neutral-700 p-4 rounded bg-neutral-800"
                      >
                        <h3 className="text-sm font-semibold mb-3 text-white">
                          {team === teams.blue ? "🟦 " : "🟥 "}
                          {team}
                        </h3>

                        <div className="flex items-center mb-2 gap-2">
                          <span className="text-sm text-gray-400 w-12">
                            PICK :
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
                          <span className="text-sm text-gray-400 w-12">
                            BAN :
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
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <button
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
          onClick={onClose}
        >
          닫기
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
