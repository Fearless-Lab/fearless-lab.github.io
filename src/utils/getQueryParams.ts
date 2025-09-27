import { useSearchParams } from "react-router-dom";

export const getBanPickQueryParams = () => {
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("matchId");
  const teamName = searchParams.get("teamName");
  const oppositeTeam = searchParams.get("oppositeTeam");
  const mode = searchParams.get("mode");
  const initialTeam = searchParams.get("initialTeam") as "blue" | "red" | null;
  const isGuest = searchParams.get("guest") === "true";

  const hasAllRequired =
    !!matchId && !!teamName && !!oppositeTeam && !!mode && !!initialTeam;

  if (!hasAllRequired) {
    return { isError: true } as const;
  }

  return {
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
    isGuest,
    isError: false,
  } as const;
};
