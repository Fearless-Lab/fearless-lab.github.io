import { CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type CopyLinkButtonProps = {
  team: "blue" | "red" | "guest";
  copied: "blue" | "red" | "guest" | null;
  teamName: string;
  onCopy: (team: "blue" | "red" | "guest") => void;
  className?: string;
};

const CopyLinkButton = ({
  team,
  copied,
  teamName,
  onCopy,
  className,
}: CopyLinkButtonProps) => {
  const isCopied = copied === team;

  const teamGradient =
    team === "blue"
      ? "bg-gradient-to-l from-blue-400/40 via-blue-500/50 to-blue-700/60"
      : team === "red"
      ? "bg-gradient-to-r from-rose-400/40 via-rose-500/50 to-rose-700/60"
      : "bg-gradient-to-r from-gray-400/40 via-gray-500/50 to-gray-700/60";

  const copiedGradient =
    team === "blue"
      ? "bg-gradient-to-l from-blue-200/60 via-blue-300/70 to-blue-400/80"
      : team === "red"
      ? "bg-gradient-to-r from-rose-200/60 via-rose-300/70 to-rose-400/80"
      : "bg-gradient-to-r from-gray-200/60 via-gray-300/70 to-gray-400/80";

  return (
    <button
      onClick={() => onCopy(team)}
      className={clsx(
        "flex items-center justify-center gap-1 px-3 py-2 rounded-md shadow-md border transition-all duration-500 backdrop-blur-md cursor-pointer w-full",
        isCopied
          ? `${copiedGradient} text-black border-white/20`
          : `${teamGradient} text-white border-white/10 hover:brightness-150`,
        className
      )}
    >
      {isCopied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          {team === "guest"
            ? "관전자 링크 복사 완료!"
            : `${teamName} 팀 링크 복사 완료!`}
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          {team === "guest" ? "관전자 링크 복사" : `${teamName} 팀 링크 복사`}
        </>
      )}
    </button>
  );
};

export default CopyLinkButton;
