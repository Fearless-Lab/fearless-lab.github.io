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
  currentStep: number; // ✅ currentStep 추가
  teamName: string;
  oppositeTeam: string;
  open: boolean;
  onClose: () => void;
}

const HistoryModal = ({
  matchId,
  currentSet,
  currentStep,
  teamName,
  oppositeTeam,
  open,
  onClose,
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
            queries.map((q, idx) => (
              <div key={idx}>
                <h2 className="font-bold text-base text-white mb-1">
                  {idx + 1} 세트
                </h2>
                <pre className="bg-neutral-800 p-3 rounded text-xs whitespace-pre-wrap break-all border border-neutral-700 text-white">
                  {JSON.stringify(q.data, null, 2)}
                </pre>
              </div>
            ))}
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
