import { useEffect, useState } from "react";
import { PHASE } from "@constants/banPick";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

import DiamondBot from "@/assets/Position_Diamond-Bot.png";
import DiamondJungle from "@/assets/Position_Diamond-Jungle.png";
import DiamondMid from "@/assets/Position_Diamond-Mid.png";
import DiamondSupport from "@/assets/Position_Diamond-Support.png";
import DiamondTop from "@/assets/Position_Diamond-Top.png";

import GrandmasterBot from "@/assets/Position_Grandmaster-Bot.png";
import GrandmasterJungle from "@/assets/Position_Grandmaster-Jungle.png";
import GrandmasterMid from "@/assets/Position_Grandmaster-Mid.png";
import GrandmasterSupport from "@/assets/Position_Grandmaster-Support.png";
import GrandmasterTop from "@/assets/Position_Grandmaster-Top.png";

interface PickColumnProps {
  team: "blue" | "red";
  picks: (string | undefined)[];
  currentStep: number;
  isSwapPhase: boolean;
  onSwap: (newOrder: (string | undefined)[]) => void;
  myTeam: "blue" | "red" | undefined;
  commited: boolean;
  isGuest: boolean;
}

const roleOrder = ["Top", "Jungle", "Mid", "Bot", "Support"];

const roleIcons: Record<"blue" | "red", Record<string, string>> = {
  blue: {
    Top: DiamondTop,
    Jungle: DiamondJungle,
    Mid: DiamondMid,
    Bot: DiamondBot,
    Support: DiamondSupport,
  },
  red: {
    Top: GrandmasterTop,
    Jungle: GrandmasterJungle,
    Mid: GrandmasterMid,
    Bot: GrandmasterBot,
    Support: GrandmasterSupport,
  },
};

const PickColumn = ({
  team,
  picks,
  currentStep,
  isSwapPhase,
  onSwap,
  myTeam,
  commited,
  isGuest,
}: PickColumnProps) => {
  const currentPhase = PHASE[currentStep];

  const isCurrentTeam =
    currentPhase?.team === team && currentPhase?.type === "pick";
  const currentIndex = currentPhase?.index;

  const isDraggable = isSwapPhase && team === myTeam && !commited;

  const [items, setItems] = useState(picks);

  useEffect(() => {
    setItems(picks);
  }, [picks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => (item ?? `empty-${items.indexOf(item)}`) === active.id
    );
    const newIndex = items.findIndex(
      (item) => (item ?? `empty-${items.indexOf(item)}`) === over.id
    );

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onSwap(newItems);
    }
  };

  // 드래그 가능 상태
  if (isDraggable && !isGuest) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((c, i) => c ?? `empty-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((champion, index) => {
            const role = roleOrder[index];
            return (
              <div key={`${team}-pick-${index}`} className="relative flex-1">
                <img
                  src={roleIcons[team][role]}
                  alt={`${role} icon`}
                  className={`absolute top-1 w-5 h-5 pointer-events-none z-10 bg-black/70 rounded ${
                    team === "blue" ? "right-1" : "left-1"
                  }`}
                />
                <SortableItem
                  id={champion ?? `empty-${index}`}
                  champion={champion}
                  team={team}
                />
              </div>
            );
          })}
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <>
      {picks.map((champion, i) => {
        const role = roleOrder[i];
        return (
          <div
            key={`${team}-pick-${i}`}
            className={`flex-1 relative rounded-md bg-cover ${
              isCurrentTeam && i === currentIndex
                ? "border-2 animate-border-ripple"
                : ""
            }`}
            style={
              {
                backgroundImage: champion
                  ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
                  : undefined,
                "--ripple-color":
                  team === "blue"
                    ? "rgba(96, 165, 250, 0.7)"
                    : "rgba(244, 63, 94, 0.7)",
              } as React.CSSProperties
            }
          >
            <img
              src={roleIcons[team][role]}
              alt={`${role} icon`}
              className={`absolute top-1 w-5 h-5 pointer-events-none z-10 bg-black/70 rounded ${
                team === "blue" ? "right-1" : "left-1"
              }`}
            />
            {champion && (
              <div
                className={`absolute top-1 px-1 py-0.5 text-[9px] md:text-xs font-semibold text-white bg-black/70 rounded ${
                  team === "blue" ? "left-1" : "right-1"
                }`}
              >
                {champion}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default PickColumn;
