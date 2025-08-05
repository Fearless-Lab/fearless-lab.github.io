import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { modeDescription } from "@constants/category";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useQueries } from "@tanstack/react-query";
import { fetchPickBySet } from "@/apis/service/fetchPickBySet";

interface BanOverviewModalProps {
  open: boolean;
  onClose: () => void;
  mode: string;
  matchId: string;
  currentSet: number;
  currentStep: number;
  teamName: string;
  oppositeTeam: string;
  version: string;
}

const BanOverviewModal = ({
  open,
  onClose,
  mode,
  matchId,
  currentSet,
  currentStep,
  teamName,
  oppositeTeam,
  version,
}: BanOverviewModalProps) => {
  const isCurrentSetFinished = currentStep === 21;

  const queries = useQueries({
    queries: Array.from(
      { length: isCurrentSetFinished ? currentSet : currentSet - 1 },
      (_, i) => {
        const setNum = i + 1;
        return {
          queryKey: ["pickBySet", matchId, setNum],
          queryFn: () =>
            fetchPickBySet(matchId, setNum, teamName, oppositeTeam),
          staleTime: Infinity,
          enabled: open,
        };
      }
    ),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-neutral-900 border border-neutral-700 text-white overflow-auto z-100"
      >
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle className="text-lg md:text-xl">
              {mode === "fearless" ? "소프트 피어리스" : "하드 피어리스"}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 text-sm">
              {mode === "fearless"
                ? modeDescription["소프트 피어리스"]
                : modeDescription["하드 피어리스"]}
              {modeDescription[mode]}
            </DialogDescription>

            <div className="mt-4 mb-4 border-t border-neutral-700" />
          </div>

          <div className="flex items-center gap-2">
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

        <div className="mt-4 space-y-6">
          {isLoading && <p className="text-gray-300">불러오는 중...</p>}
          {isError && (
            <p className="text-rose-400">데이터를 불러오는 데 실패했습니다.</p>
          )}

          {!isLoading &&
            !isError &&
            queries.map((q, idx) => {
              const picks = q.data;
              if (!picks) return null;

              return (
                <div key={idx} className="flex items-center gap-4">
                  <h2 className="font-bold text-base text-white whitespace-nowrap">
                    Set {idx + 1}
                  </h2>

                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      {picks.slice(0, 5).map((champId) => (
                        <img
                          key={champId}
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                          alt={champId}
                          title={champId}
                          className="w-10 h-10 rounded border border-neutral-600 object-cover"
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {picks.slice(5, 10).map((champId) => (
                        <img
                          key={champId}
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                          alt={champId}
                          title={champId}
                          className="w-10 h-10 rounded border border-neutral-600 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BanOverviewModal;
