import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

interface BestOfSelectorProps {
  bestOf: number;
  onSelect: (value: number) => void;
  allowSingle: boolean;
}

const BEST_OF_LABELS: Record<number, string> = {
  1: "단판(시간 무제한)",
  3: "3판 2선",
  5: "5판 3선",
};

function highlightNumbers(label: string, bestOf: number) {
  const gradient =
    bestOf === 3
      ? "from-yellow-300 via-orange-400 to-amber-500"
      : "from-orange-400 via-red-500 to-rose-500";

  return label.split(/(\d+)/).map((part, i) =>
    /\d+/.test(part) ? (
      <span
        key={i}
        className={cn(
          "text-transparent bg-clip-text font-semibold drop-shadow-[0_0_2px_rgba(255,180,80,0.5)]",
          `bg-gradient-to-r ${gradient}`
        )}
      >
        {part}
      </span>
    ) : (
      <span key={i} className="text-gray-100">
        {part}
      </span>
    )
  );
}

export const BestOfSelector = ({
  bestOf,
  onSelect,
  allowSingle,
}: BestOfSelectorProps) => {
  const currentLabel = BEST_OF_LABELS[bestOf];
  // 단판은 이전 세트가 없어 피어리스 규칙이 의미 없으므로 토너먼트 드래프트에서만 노출
  const options = Object.entries(BEST_OF_LABELS).filter(
    ([key]) => allowSingle || Number(key) !== 1
  );

  return (
    <div className="flex justify-center items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          className={cn(
            "inline-flex items-center justify-between min-w-30 px-4 py-2 rounded-lg whitespace-nowrap",
            "border border-gray-600 text-gray-200 bg-zinc-900/40",
            "hover:border-white",
            "shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
          )}
        >
          <span className="flex items-center gap-0.5">
            {highlightNumbers(currentLabel, bestOf)}
          </span>
          <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
        </MenuButton>

        <MenuItems
          className={cn(
            "absolute left-1/2 -translate-x-1/2 mt-2 min-w-full w-max origin-top rounded-md whitespace-nowrap",
            "bg-zinc-900/90 border border-gray-700 shadow-lg",
            "focus:outline-none backdrop-blur-sm p-1"
          )}
        >
          {options.map(([key, label]) => {
            const value = Number(key);
            const isActive = bestOf === value;

            return (
              <MenuItem key={value}>
                {({ focus }) => (
                  <button
                    onClick={() => onSelect(value)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm font-medium",
                      "flex items-center gap-0.5 rounded-md transition-all duration-150",
                      isActive
                        ? "bg-yellow-400/20 text-yellow-100"
                        : focus
                        ? "bg-zinc-800/70 text-white"
                        : "text-gray-300 hover:bg-zinc-800/60 hover:text-white",
                      "focus:outline-none"
                    )}
                  >
                    {highlightNumbers(label, value)}
                  </button>
                )}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
};
