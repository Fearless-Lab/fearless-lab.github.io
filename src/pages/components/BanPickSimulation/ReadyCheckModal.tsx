import CTAButton from "@/components/CTAButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  // ArrowPathIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

type ReadyCheckModalProps = {
  open: boolean;
  onReadyClick: () => void;
  isReady: boolean;
};

const ReadyCheckModal = ({
  open,
  onReadyClick,
  isReady,
}: ReadyCheckModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogContent
        className="bg-neutral-900 border border-neutral-700 text-white w-full max-w-[calc(100%-2rem)] mx-auto z-100 outline-none"
        showCloseButton={false}
      >
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg md:text-xl">
            팀 준비 완료 확인
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2 text-sm">
            밴픽은 데스크탑 환경에서의 이용을 권장합니다.
            <br />양 팀이 준비 완료를 눌러야 밴픽이 시작됩니다.
          </DialogDescription>
          <DialogDescription className="text-gray-400 mt-2 text-sm">
            좌측은 블루팀, 우측은 레드팀입니다.
            <br />
            본인의 팀명을 확인해 주세요!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 text-sm text-white space-y-3">
          <div className="flex items-center gap-2">
            <ClipboardDocumentListIcon className="w-5 h-5" />
            이전 세트의 밴픽 기록을 확인할 수 있습니다.
            <br />
            1세트 종료 이후부터 확인할 수 있습니다.
          </div>
          <div className="flex flex-col gap-1">
            {/* <div className="flex items-center gap-2">
              <ArrowPathIcon className="w-5 h-5 text-rose-400" />
              해당 세트의 밴픽을 처음부터 다시 시작합니다.
            </div> */}
            {/* <div className="text-xs text-gray-400 ml-7">
              ※ 다시 시작하려면 상대팀의 동의가 필요합니다.
            </div> */}
          </div>
        </div>

        <CTAButton
          onClick={onReadyClick}
          disabled={isReady}
          className={isReady ? "bg-gray-500" : ""}
        >
          {isReady ? "상대가 아직 준비중입니다.." : "시작하기"}
        </CTAButton>
        <CTAButton
          className="bg-rose-500 py-2 text-sm font-normal hover:bg-rose-400"
          onClick={() => navigate("/banPick")}
        >
          이전 화면으로 돌아가기
        </CTAButton>
      </DialogContent>
    </Dialog>
  );
};

export default ReadyCheckModal;
