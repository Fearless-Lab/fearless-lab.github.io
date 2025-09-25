import { useState } from "react";
import CTAButton from "@/components/CTAButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ChevronDoubleRightIcon,
  HomeIcon,
  MagnifyingGlassPlusIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  BookOpenIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Volume2 } from "lucide-react";
import ChampGridForNote from "./ChampGridForNote";
import type { Champion } from "@/utils/generateRandomNickname";

type ReadyCheckModalProps = {
  open: boolean;
  currentSet: number;
  onReadyClick: () => void;
  isReady: boolean;
  mode: "normal" | "fearless" | "hardFearless";
  champions: Champion[];
  version: string;
  previousPicks: Set<string>;
  oppoPreviousPicks: Set<string>;
};

const ReadyCheckModal = ({
  open,
  currentSet,
  onReadyClick,
  isReady,
  mode,
  champions,
  version,
  previousPicks,
  oppoPreviousPicks,
}: ReadyCheckModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <Dialog open={open}>
      <DialogContent
        className="bg-neutral-900 border border-neutral-700 text-white 
                    w-full max-w-[calc(100%-2rem)] mx-auto z-100 outline-none 
                    max-h-[95vh] overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {step === 1 && currentSet === 1 && (
          <>
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
                <DocumentTextIcon className="w-5 h-5" />
                이전 세트의 라인별 챔피언을 확인할 수 있습니다.
              </div>
              <div className="flex items-center gap-2">
                <ChevronDoubleRightIcon className="w-5 h-5" />
                이전 세트의 밴픽 흐름을 확인할 수 있습니다.
              </div>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                전략 노트에 추가한 챔피언들을 확인할 수 있습니다.
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                10초 이하가 되면 긴박감을 위해 북소리가 울립니다.
              </div>
              <div className="text-xs text-gray-400 ml-7">
                버튼을 다시 누르면 음소거할 수 있습니다.
              </div>
              <div className="flex items-center gap-2">
                <MagnifyingGlassPlusIcon className="w-5 h-5 text-blue-400" />
                화면이 작게 보인다면 브라우저 배율을 높여주세요.
              </div>
              <div className="flex items-center gap-2">
                <MusicalNoteIcon className="w-5 h-5 text-yellow-400" />
                페이지 하단에 밴픽 브금 영상이 있습니다.
              </div>
            </div>

            <CTAButton onClick={() => setStep(2)}>다음</CTAButton>
            <CTAButton
              className="bg-rose-500 py-2 text-sm font-normal hover:bg-rose-400 flex items-center gap-2 justify-center"
              onClick={() => navigate("/banPick")}
            >
              <HomeIcon className="w-5 h-5" />
              홈으로 돌아가기
            </CTAButton>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg md:text-xl flex items-center gap-2">
                {currentSet === 1 && (
                  <ChevronLeftIcon
                    className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition"
                    onClick={() => setStep(1)}
                  />
                )}
                전략 노트
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2 text-xs md:text-sm">
                우리 팀과 상대 팀이 사용할 챔피언을 정리해 보세요.
                <br />
                클릭으로 간단히 추가ㆍ해제할 수 있어요.
                <br />
                전략 노트 구성은 선택 사항이지만, 준비 완료는 반드시 눌러주세요!
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-hidden">
              <ChampGridForNote
                champions={champions}
                version={version}
                previousPicks={previousPicks}
                oppoPreviousPicks={oppoPreviousPicks}
                mode={mode}
              />
            </div>

            <CTAButton
              onClick={onReadyClick}
              disabled={isReady}
              className={`w-full ${isReady ? "bg-gray-500" : ""}`}
            >
              {isReady ? "상대가 아직 준비중입니다.." : "준비완료"}
            </CTAButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReadyCheckModal;
