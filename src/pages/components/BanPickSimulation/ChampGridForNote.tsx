import { useState, useEffect } from "react";
import type { Champion } from "@/utils/generateRandomNickname";
import { positionMap, positions, type Position } from "@constants/positions";
import PositionRow from "./PositionRow";
import { Input } from "@/components/ui/input";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/16/solid";
import CTAButton from "@/components/CTAButton";
import { preloadSplash } from "@/utils/preload";

type TeamNotes = {
  our: Record<Position, string[]>;
  oppo: Record<Position, string[]>;
};

const STORAGE_KEY = "teamNotes";

const emptyNotes: TeamNotes = {
  our: { TOP: [], JUNGLE: [], MID: [], ADC: [], SUP: [] },
  oppo: { TOP: [], JUNGLE: [], MID: [], ADC: [], SUP: [] },
};

type ChampGridForNoteProps = {
  champions: Champion[];
  version: string;
  previousPicks: Set<string>;
  oppoPreviousPicks: Set<string>;
  mode: "normal" | "fearless" | "hardFearless";
};

export default function ChampGridForNote({
  champions,
  version,
  previousPicks,
  oppoPreviousPicks,
  mode,
}: ChampGridForNoteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<Position>("TOP");
  const [teamNotes, setTeamNotes] = useState<TeamNotes>(emptyNotes);
  const [selectedSide, setSelectedSide] = useState<"our" | "oppo">("our");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const sanitized: TeamNotes = { ...emptyNotes };
        (["our", "oppo"] as const).forEach((side) => {
          (Object.keys(sanitized[side]) as Position[]).forEach((pos) => {
            const value = parsed?.[side]?.[pos];
            sanitized[side][pos] = Array.isArray(value)
              ? value
              : value
              ? [value]
              : [];
          });
        });

        setTeamNotes(sanitized);
      } catch {
        setTeamNotes(emptyNotes);
      }
    }
  }, []);

  const updateStorage = (notes: TeamNotes) => {
    setTeamNotes(notes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  };

  const handleToggleChampion = (champId: string) => {
    const newNotes: TeamNotes = JSON.parse(JSON.stringify(teamNotes));
    const arr = newNotes[selectedSide][selectedPosition];

    if (arr.includes(champId)) {
      newNotes[selectedSide][selectedPosition] = arr.filter(
        (c) => c !== champId
      );
    } else {
      newNotes[selectedSide][selectedPosition].push(champId);
    }

    updateStorage(newNotes);
  };

  const filteredChampions = champions.filter((champ) => {
    const matchesPosition = positionMap[selectedPosition].has(champ.name);
    const matchesSearch = searchTerm
      ? champ.name.includes(searchTerm.trim())
      : true;
    return matchesPosition && matchesSearch;
  });

  const isOurSide = selectedSide === "our";

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center gap-2">
        <PositionRow
          selected={selectedPosition}
          onSelect={(pos) => setSelectedPosition(pos as Position)}
          positions={positions}
        />

        <div className="relative w-50 flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="챔피언 검색"
              className="rounded-none border border-gray-300 pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const newNotes: TeamNotes = { ...teamNotes };
              newNotes[selectedSide][selectedPosition] = [];
              updateStorage(newNotes);
            }}
            className="p-1 text-rose-500 hover:text-rose-400 hover:scale-110 transition-transform duration-150"
            title={`${
              isOurSide ? "우리팀" : "상대팀"
            } ${selectedPosition} 초기화`}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-3 gap-0">
        <CTAButton
          onClick={() => setSelectedSide("our")}
          className={`flex-1 text-xs px-2 py-2 rounded-b-none ${
            isOurSide ? "bg-blue-500 hover:bg-blue-400" : "bg-neutral-700"
          }`}
        >
          우리 팀
        </CTAButton>
        <CTAButton
          onClick={() => setSelectedSide("oppo")}
          className={`flex-1 text-xs px-2 py-2 rounded-b-none ${
            !isOurSide ? "bg-rose-500 hover:bg-rose-400" : "bg-neutral-700"
          }`}
        >
          상대 팀
        </CTAButton>
      </div>

      <div
        className={`h-[40vh] overflow-y-auto border-2 p-2 rounded-md rounded-t-none ${
          isOurSide ? "border-blue-500" : "border-rose-500"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-3 mt-1">
          {filteredChampions.map((champ) => {
            let isDisabled = false;
            if (mode === "hardFearless") {
              isDisabled = previousPicks.has(champ.id);
            } else if (mode === "fearless") {
              if (selectedSide === "our") {
                isDisabled = previousPicks.has(champ.id);
              } else {
                isDisabled = oppoPreviousPicks.has(champ.id);
              }
            }

            const inOur = teamNotes.our[selectedPosition].includes(champ.id);
            const inOppo = teamNotes.oppo[selectedPosition].includes(champ.id);

            const isSelected =
              (selectedSide === "our" && inOur) ||
              (selectedSide === "oppo" && inOppo);

            return (
              <div
                key={champ.id}
                className="w-12 flex flex-col items-center cursor-pointer"
                onMouseEnter={() => preloadSplash(champ.id)}
                onClick={() => handleToggleChampion(champ.id)}
              >
                <div className="relative w-12 h-12 rounded-md transition">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                    alt={champ.name}
                    className={`w-full h-full object-cover rounded-md ${
                      isDisabled ? "opacity-60 grayscale" : ""
                    }`}
                  />

                  {isSelected && (
                    <div
                      className={`absolute inset-0 border-2 ${
                        isOurSide ? "border-blue-500" : "border-rose-500"
                      } rounded-md pointer-events-none`}
                    />
                  )}
                </div>

                <div
                  className={`mt-1 text-[8px] text-center w-full truncate ${
                    isDisabled
                      ? "text-gray-200"
                      : isSelected
                      ? isOurSide
                        ? "text-blue-300"
                        : "text-rose-300"
                      : "text-white"
                  }`}
                >
                  {champ.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
