import { useSearchParams } from "react-router-dom";

export const getBanPickQueryParams = () => {
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("matchId") ?? "";
  const teamName = searchParams.get("teamName") ?? "";
  const oppositeTeam = searchParams.get("oppositeTeam") ?? "";
  const mode = searchParams.get("mode") ?? "";
  const initialTeam = (searchParams.get("initialTeam") ?? "blue") as
    | "blue"
    | "red";

  const isGuest = searchParams.get("guest") === "true";

  return { matchId, teamName, oppositeTeam, mode, initialTeam, isGuest };
};
