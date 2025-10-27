import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

interface BestOfSelectorProps {
  bestOf: number;
  onSelect: (value: number) => void;
}

const BEST_OF_LABELS: Record<number, string> = {
  3: "3판 2선",
  5: "5판 3선",
};

function highlightNumbers(label: string) {
  return label.split(/(\d+)/).map((part, i) =>
    /\d+/.test(part) ? (
      <span
        key={i}
        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 font-semibold"
      >
        {part}
      </span>
    ) : (
      <span key={i} className="text-white">
        {part}
      </span>
    )
  );
}

export const BestOfSelector = ({ bestOf, onSelect }: BestOfSelectorProps) => {
  const currentLabel = BEST_OF_LABELS[bestOf];

  return (
    <div className="flex justify-center items-center">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          className={cn(
            "inline-flex items-center justify-between w-36 px-4 py-2 rounded-lg",
            "border border-gray-600 text-gray-200 bg-zinc-900/40",
            "hover:border-yellow-400 hover:text-yellow-200",
            "shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
          )}
        >
          <span className="flex items-center gap-0.5">
            {highlightNumbers(currentLabel)}
          </span>
          <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
        </MenuButton>

        <MenuItems
          className={cn(
            "absolute left-1/2 -translate-x-1/2 mt-2 w-36 origin-top rounded-md",
            "bg-zinc-900/90 border border-gray-700 shadow-lg",
            "focus:outline-none backdrop-blur-sm p-1"
          )}
        >
          {Object.entries(BEST_OF_LABELS).map(([key, label]) => {
            const value = Number(key);
            return (
              <MenuItem key={value}>
                {({ focus }) => (
                  <button
                    onClick={() => onSelect(value)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm font-medium",
                      "flex items-center gap-0.5 rounded-md transition-colors",
                      "text-gray-300 hover:text-white hover:bg-zinc-800/60",
                      focus && "bg-yellow-400/15 text-yellow-200",
                      bestOf === value && "bg-yellow-400/25 text-yellow-100",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
                    )}
                  >
                    {highlightNumbers(label)}
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
