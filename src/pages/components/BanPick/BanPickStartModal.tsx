import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import CopyLinkButton from "./CopyLinkButton";

const modalDescription = {
  error: [
    "제한 시간 내 밴픽을 완료하지 않으면 자동으로 랜덤한 챔피언이 선택됩니다.",
    "밴픽 실수 시에는 해당 세트를 초기화하고 처음부터 다시 진행해야 합니다.",
  ],
};

type BanpickNoticeModalProps = {
  open: boolean;
  onClose: () => void;
  blueTeamName: string;
  redTeamName: string;
};

const BanPickNoticeModal = ({
  open,
  onClose,
  blueTeamName,
  redTeamName,
}: BanpickNoticeModalProps) => {
  const [copied, setCopied] = useState<"blue" | "red" | null>(null);
  const matchUrl = window.location.href;

  const handleCopy = (team: "blue" | "red") => {
    navigator.clipboard.writeText(matchUrl);
    setCopied(team); // 유지만 함
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setCopied(null);
          onClose();
        }
      }}
    >
      <DialogContent className="bg-neutral-900 border border-neutral-700 text-white w-full max-w-[calc(100%-2rem)] mx-auto z-100">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg md:text-xl">
            밴픽 시뮬레이터 참여 전 주의사항
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2 text-sm">
            아래 내용을 반드시 확인하고 진행해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 text-sm text-white space-y-3">
          {modalDescription.error.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <XCircleIcon className="w-5 h-5 text-rose-400 shrink-0" />
              {d}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
          <CopyLinkButton
            team="blue"
            copied={copied}
            teamName={blueTeamName}
            onCopy={handleCopy}
          />
          <CopyLinkButton
            team="red"
            copied={copied}
            teamName={redTeamName}
            onCopy={handleCopy}
          />
        </div>

        <DialogDescription className="text-gray-400 mt-2 text-sm">
          밴픽을 진행할 팀별 전용 URL입니다.
          <br />각 팀은 해당 URL로 접속하여 밴픽을 진행해주세요!
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BanPickNoticeModal;
