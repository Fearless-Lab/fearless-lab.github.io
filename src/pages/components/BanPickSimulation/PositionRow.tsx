import { positions, type Position } from "@constants/positions";
import CategoryButton from "../Community/CategoryButton";

interface PositionRowProps {
  selected: Position | null;
  onSelect: (pos: Position | null) => void;
  positions: readonly Position[];
}

export default function PositionRow({ selected, onSelect }: PositionRowProps) {
  return (
    <div className="flex items-center mb-1">
      {positions.map((pos, i) => (
        <CategoryButton
          key={pos}
          label={pos}
          isSelected={selected === pos}
          onClick={() => onSelect(selected === pos ? null : pos)}
          showSeparator={i !== positions.length - 1}
        />
      ))}
    </div>
  );
}
