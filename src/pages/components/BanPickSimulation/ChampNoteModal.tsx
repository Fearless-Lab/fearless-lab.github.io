import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import { positions, type Position } from "@constants/positions";
import { BookOpenIcon } from "@heroicons/react/16/solid";

import MasterTop from "@/assets/Position_Master-Top.png";
import MasterJungle from "@/assets/Position_Master-Jungle.png";
import MasterMid from "@/assets/Position_Master-Mid.png";
import MasterBot from "@/assets/Position_Master-Bot.png";
import MasterSupport from "@/assets/Position_Master-Support.png";

const positionIcons: Record<Position, string> = {
  TOP: MasterTop,
  JUNGLE: MasterJungle,
  MID: MasterMid,
  ADC: MasterBot,
  SUP: MasterSupport,
};

type TeamNotes = {
  our: Record<Position, string[]>;
  oppo: Record<Position, string[]>;
};

const STORAGE_KEY = "teamNotes";

const emptyNotes: TeamNotes = {
  our: { TOP: [], JUNGLE: [], MID: [], ADC: [], SUP: [] },
  oppo: { TOP: [], JUNGLE: [], MID: [], ADC: [], SUP: [] },
};

type ChampNoteModalProps = {
  open: boolean;
  onClose: () => void;
  version: string;
  previousPicks: Set<string>;
  oppoPreviousPicks: Set<string>;
  currentSetSelections: Set<string>;
  mode: "normal" | "fearless" | "hardFearless";
};

export default function ChampNoteModal({
  open,
  onClose,
  version,
  previousPicks,
  oppoPreviousPicks,
  currentSetSelections,
  mode,
}: ChampNoteModalProps) {
  const [teamNotes, setTeamNotes] = useState<TeamNotes>(emptyNotes);
  const nodeRef = useRef<HTMLDivElement>(null);

  // 모바일에서 드래그를 비활성화 하기 위한 상태
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setTeamNotes(JSON.parse(saved));
        } catch {
          setTeamNotes(emptyNotes);
        }
      }
    }
  }, [open]);

  if (!open) return null;

  const getIsDisabled = (champId: string, side: "our" | "oppo") => {
    let isDisabled = false;

    if (mode === "hardFearless") {
      isDisabled = previousPicks.has(champId);
    } else if (mode === "fearless") {
      if (side === "our") {
        isDisabled = previousPicks.has(champId);
      } else {
        isDisabled = oppoPreviousPicks.has(champId);
      }
    }

    if (currentSetSelections.has(champId)) {
      isDisabled = true;
    }

    return isDisabled;
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center transition-opacity duration-200 bg-black/20"
      onClick={onClose}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".modal-handle"
        cancel=".modal-body, .no-drag, input, textarea, button, a"
        disabled={isMobile}
      >
        <div
          ref={nodeRef}
          className="bg-neutral-900/90 rounded-2xl shadow-2xl w-[90%] max-w-[600px] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-handle flex justify-between items-center p-6 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: "none" }}
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              전략 노트
            </h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div
            className="modal-body px-6 pb-6 overflow-y-auto max-h-[72vh]"
            style={{
              WebkitOverflowScrolling: "touch", // iOS 부드러운 스크롤
              touchAction: "pan-y", // 세로 스와이프는 브라우저/스크롤에 양보
            }}
          >
            <p className="text-xs text-gray-400 mb-4">
              전략 노트 수정은 세트 종료 후 가능하며,
              <br />
              사용할 수 없는 챔피언은 흐리게 표시돼요.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-center text-blue-400 font-semibold mb-2">
                  우리 팀
                </h3>
                <div className="flex flex-col">
                  {positions.map((pos, idx) => (
                    <div
                      key={pos}
                      className={`flex items-center gap-2 py-2 ${
                        idx < positions.length - 1
                          ? "border-b border-neutral-700"
                          : ""
                      }`}
                    >
                      <img
                        src={positionIcons[pos]}
                        alt={pos}
                        className="w-5 h-5 opacity-80"
                      />
                      <div className="flex gap-1 flex-wrap">
                        {teamNotes.our[pos]?.map((champId) => {
                          const isDisabled = getIsDisabled(champId, "our");
                          return (
                            <div
                              key={champId}
                              className={`w-7 h-7 ${
                                isDisabled ? "grayscale" : ""
                              }`}
                            >
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                                alt={champId}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-center text-rose-400 font-semibold mb-2">
                  상대 팀
                </h3>
                <div className="flex flex-col">
                  {positions.map((pos, idx) => (
                    <div
                      key={pos}
                      className={`flex items-center gap-2 py-2 ${
                        idx < positions.length - 1
                          ? "border-b border-neutral-700"
                          : ""
                      }`}
                    >
                      <img
                        src={positionIcons[pos]}
                        alt={pos}
                        className="w-5 h-5 opacity-80"
                      />
                      <div className="flex gap-1 flex-wrap">
                        {teamNotes.oppo[pos]?.map((champId) => {
                          const isDisabled = getIsDisabled(champId, "oppo");
                          return (
                            <div
                              key={champId}
                              className={`w-7 h-7 ${
                                isDisabled ? "grayscale" : ""
                              }`}
                            >
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`}
                                alt={champId}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
