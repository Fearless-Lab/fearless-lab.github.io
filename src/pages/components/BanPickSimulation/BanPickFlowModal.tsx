import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useQueries } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { fetchBanPickFlowBySet } from "@/apis/service/fetchBanPickBySet";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

interface BanPickFlowModalProps {
  matchId: string;
  currentSet: number;
  currentStep: number;
  open: boolean;
  onClose: () => void;
  version: string;
}

const BanPickFlowModal = ({
  matchId,
  currentSet,
  currentStep,
  open,
  onClose,
  version,
}: BanPickFlowModalProps) => {
  const isCurrentSetFinished = currentStep === 21;

  const queries = useQueries({
    queries: Array.from(
      { length: isCurrentSetFinished ? currentSet : currentSet - 1 },
      (_, i) => {
        const setNum = i + 1;
        return {
          queryKey: ["banPickFlow", matchId, setNum],
          queryFn: () => fetchBanPickFlowBySet(matchId, setNum),
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
        isFullscreen={false}
        showCloseButton={false}
        className="bg-neutral-900 border border-neutral-700 text-white overflow-auto z-100"
      >
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle className="text-lg md:text-xl flex gap-2 items-center">
              <ChevronDoubleRightIcon className="w-5 h-5" />
              밴픽 흐름
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 text-sm">
              이전 세트의 밴픽 진행 순서를 확인할 수 있어요.
              <br />
              {/* 세트별로 위는 블루팀, 아래는 레드팀이에요.
              <br /> */}
              상대의 의도를 파악하는 데 도움이 될 거예요.
            </DialogDescription>
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

        <div className="mt-6 text-sm space-y-8">
          {isLoading && <p className="text-gray-300">불러오는 중...</p>}
          {isError && (
            <p className="text-rose-400">데이터를 불러오는데 실패했습니다.</p>
          )}

          {!queries.length && (
            <p className="text-gray-400 flex items-center gap-2 justify-center">
              앗.. 아직 경기 기록이 없네요 😢
            </p>
          )}

          {!isLoading &&
            !isError &&
            queries.map((q, idx) => {
              const data = q.data as {
                actionLog: string[];
                teams: { blue: string; red: string };
              } | null;
              if (!data) return null;

              const { actionLog, teams } = data;

              return (
                <div key={idx}>
                  <h2 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                    Set {idx + 1}
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded",
                        "bg-blue-600/40 text-blue-300"
                      )}
                    >
                      {teams.blue}
                    </span>
                    vs
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded",
                        "bg-red-600/40 text-red-300"
                      )}
                    >
                      {teams.red}
                    </span>
                  </h2>

                  <div className="relative bg-neutral-800 p-2 rounded border border-neutral-700 inline-block overflow-x-auto w-full">
                    {/* Top blue gradient */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none rounded-t" />
                    {/* Bottom red gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-red-500/20 to-transparent pointer-events-none rounded-b" />

                    {/* --- Content --- */}
                    <div className="flex items-center gap-1 relative z-10">
                      <BanBox champId={actionLog[0]} version={version} />
                      <BanBox champId={actionLog[2]} version={version} />
                      <BanBox champId={actionLog[4]} version={version} />

                      <PickBox
                        champId={actionLog[6]}
                        version={version}
                        className="ml-3"
                      />
                      <PickBox
                        champId={actionLog[9]}
                        version={version}
                        className="ml-4"
                      />
                      <PickBox champId={actionLog[10]} version={version} />

                      <BanBox
                        champId={actionLog[13]}
                        version={version}
                        className="ml-6"
                      />
                      <BanBox champId={actionLog[15]} version={version} />

                      <PickBox
                        champId={actionLog[17]}
                        version={version}
                        className="ml-4"
                      />
                      <PickBox champId={actionLog[18]} version={version} />
                    </div>

                    <div className="h-px w-full bg-neutral-600 mt-2 opacity-50 relative z-10" />

                    <div className="flex items-center gap-1 mt-2 ml-2 relative z-10">
                      <BanBox champId={actionLog[1]} version={version} />
                      <BanBox champId={actionLog[3]} version={version} />
                      <BanBox champId={actionLog[5]} version={version} />

                      <PickBox
                        champId={actionLog[7]}
                        version={version}
                        className="ml-3"
                      />
                      <PickBox champId={actionLog[8]} version={version} />
                      <PickBox
                        champId={actionLog[11]}
                        version={version}
                        className="ml-4"
                      />

                      <BanBox
                        champId={actionLog[12]}
                        version={version}
                        className="ml-2"
                      />
                      <BanBox champId={actionLog[14]} version={version} />

                      <PickBox
                        champId={actionLog[16]}
                        version={version}
                        className="ml-4"
                      />
                      <PickBox
                        champId={actionLog[19]}
                        version={version}
                        className="ml-4"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <button
          className="h-10 mt-8 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
          onClick={onClose}
          type="button"
        >
          닫기
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default BanPickFlowModal;

const BanBox = ({
  champId,
  version,
  className = "",
}: {
  champId: string;
  version: string;
  className?: string;
}) => (
  <div
    className={cn(
      "relative w-7 h-7 bg-neutral-900 border border-neutral-600 rounded overflow-hidden",
      className
    )}
  >
    {champId && (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
        alt={champId}
        className="w-full h-full object-cover"
      />
    )}
    <div
      className={`absolute w-[70%] h-[1.2px] rotate-45 top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2 pointer-events-none 
                  ${champId ? "bg-white" : "bg-white/30"}`}
    />
  </div>
);

const PickBox = ({
  champId,
  version,
  className = "",
}: {
  champId: string;
  version: string;
  className?: string;
}) => (
  <div
    className={cn(
      "w-9 h-9 border border-neutral-600 rounded overflow-hidden",
      className
    )}
  >
    {champId && (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
        alt={champId}
        className="w-full h-full object-cover"
      />
    )}
  </div>
);
