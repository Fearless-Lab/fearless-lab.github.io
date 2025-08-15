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

  const teamGradient =
    team === "blue"
      ? "bg-gradient-to-l from-blue-400/40 via-blue-500/50 to-blue-700/60"
      : "bg-gradient-to-r from-rose-400/40 via-rose-500/50 to-rose-700/60";

  return (
    <button
      onClick={() => onCopy(team)}
      className={clsx(
        "flex items-center justify-center gap-1 px-3 py-2 rounded-md shadow-md border transition-all duration-500 backdrop-blur-md cursor-pointer",
        isCopied
          ? "bg-gray-100/80 text-gray-600 border-gray-300"
          : `${teamGradient} text-white border-white/10 hover:brightness-110`
      )}
    >
      {isCopied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          {teamName} 팀 링크 복사 완료!
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          {teamName} 팀 링크 복사
        </>
      )}
    </button>
  );
};

export default CopyLinkButton;
