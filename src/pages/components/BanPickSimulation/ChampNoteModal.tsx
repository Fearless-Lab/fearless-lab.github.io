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
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 bg-black/20"
      onClick={onClose}
    >
      <Draggable nodeRef={nodeRef} handle=".modal-header">
        <div
          ref={nodeRef}
          className="bg-neutral-900/90 rounded-2xl p-6 w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-2xl max-h-[70vh] overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header flex justify-between items-center mb-2 cursor-grab active:cursor-grabbing">
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

          <p className="text-xs text-gray-400 mb-4">
            전략 노트 수정은 세트 종료 후 가능하며,
            <br />
            사용할 수 없는 챔피언은 흐리게 표시돼요.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-center text-blue-400 font-semibold mb-2">
                우리 팀
              </h3>
              <div className="flex flex-col">
                {positions.map((pos, idx) => (
                  <div
                    key={pos}
                    className={`flex items-center gap-3 py-2 ${
                      idx < positions.length - 1
                        ? "border-b border-neutral-700"
                        : ""
                    }`}
                  >
                    <img
                      src={positionIcons[pos]}
                      alt={pos}
                      className="w-6 h-6 opacity-80"
                    />
                    <div className="flex gap-1 flex-wrap">
                      {teamNotes.our[pos]?.map((champId) => {
                        const isDisabled = getIsDisabled(champId, "our");
                        return (
                          <div
                            key={champId}
                            className={`w-8 h-8 rounded-md overflow-hidden ${
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
                    className={`flex items-center gap-3 py-2 ${
                      idx < positions.length - 1
                        ? "border-b border-neutral-700"
                        : ""
                    }`}
                  >
                    <img
                      src={positionIcons[pos]}
                      alt={pos}
                      className="w-6 h-6 opacity-80"
                    />
                    <div className="flex gap-1 flex-wrap">
                      {teamNotes.oppo[pos]?.map((champId) => {
                        const isDisabled = getIsDisabled(champId, "oppo");
                        return (
                          <div
                            key={champId}
                            className={`w-8 h-8 rounded-md overflow-hidden ${
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
      </Draggable>
    </div>
  );
}
