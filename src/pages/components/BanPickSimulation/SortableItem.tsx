import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  champion: string | undefined;
  team: "blue" | "red";
}

const SortableItem = ({ id, champion, team }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative w-full h-full rounded-md"
      title={champion}
    >
      <div
        className="w-full h-full rounded-md bg-cover"
        style={{
          backgroundImage: champion
            ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`
            : undefined,
        }}
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
};

export default SortableItem;
