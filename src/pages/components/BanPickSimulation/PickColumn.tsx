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

interface PickColumnProps {
  team: "blue" | "red";
  picks: (string | undefined)[];
  currentStep: number;
  isSwapPhase: boolean;
  onSwap: (newOrder: (string | undefined)[]) => void;
  myTeam: "blue" | "red" | undefined;
  commited: boolean;
}

const PickColumn = ({
  team,
  picks,
  currentStep,
  isSwapPhase,
  onSwap,
  myTeam,
  commited,
}: PickColumnProps) => {
  const currentPhase = PHASE[currentStep];
  const isCurrentTeam =
    currentPhase?.team === team && currentPhase?.type === "pick";
  const currentIndex = currentPhase?.index;

  // 우리팀이고 스왑 페이즈일 때만 드래그 가능
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

  if (isDraggable) {
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
          {items.map((champion, index) => (
            <SortableItem
              key={`${team}-pick-${index}`}
              id={champion ?? `empty-${index}`}
              champion={champion}
              team={team}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <>
      {picks.map((champion, i) => (
        <div
          key={`${team}-pick-${i}`}
          className={`flex-1 relative rounded-md ${
            isCurrentTeam && i === currentIndex
              ? `border-2 animate-border-ripple`
              : ""
          }`}
          style={
            {
              "--ripple-color":
                team === "blue"
                  ? "rgba(96, 165, 250, 0.7)"
                  : "rgba(244, 63, 94, 0.7)",
              backgroundImage: champion
                ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
                : undefined,
              backgroundSize: "cover",
              height: "80px",
            } as React.CSSProperties
          }
        >
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
      ))}
    </>
  );
};

export default PickColumn;
