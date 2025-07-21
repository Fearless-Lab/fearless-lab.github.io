import { CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type CopyLinkButtonProps = {
  team: "blue" | "red";
  copied: "blue" | "red" | null;
  teamName: string;
  onCopy: (team: "blue" | "red") => void;
};

const CopyLinkButton = ({
  team,
  copied,
  teamName,
  onCopy,
}: CopyLinkButtonProps) => {
  const isCopied = copied === team;
  const baseColor =
    team === "blue"
      ? isCopied
        ? "bg-gray-100 text-gray-500"
        : "bg-blue-400 text-white hover:brightness-110"
      : isCopied
      ? "bg-gray-100 text-gray-500"
      : "bg-red-400 text-white hover:brightness-110";

  return (
    <button
      onClick={() => onCopy(team)}
      className={clsx(
        "flex items-center justify-center gap-1 py-2 rounded-md transition-all",
        baseColor
      )}
    >
      {isCopied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          {teamName}팀 링크 복사 완료 !
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          {teamName}팀 링크 복사
        </>
      )}
    </button>
  );
};

export default CopyLinkButton;
