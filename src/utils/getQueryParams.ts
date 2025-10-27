import { useSearchParams } from "react-router-dom";

export const getBanPickQueryParams = () => {
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("matchId");
  const teamName = searchParams.get("teamName");
  const oppositeTeam = searchParams.get("oppositeTeam");
  const mode = searchParams.get("mode");
  const initialTeam = searchParams.get("initialTeam") as "blue" | "red" | null;
  const isGuest = searchParams.get("guest") === "true";
  const bestOfParam = searchParams.get("bestOf");

  const bestOf = bestOfParam ? Number(bestOfParam) : null;
  const validBestOf = bestOf === 3 || bestOf === 5;

  // 쿼리 자체가 없음 → 랜딩 페이지
  if (
    [matchId, teamName, oppositeTeam, mode, initialTeam, bestOfParam].every(
      (v) => v === null
    )
  ) {
    return { isEmpty: true, isError: false } as const;
  }

  // 일부 빠짐 또는 bestOf 비정상 → 에러 페이지
  const hasAllRequired =
    !!matchId &&
    !!teamName &&
    !!oppositeTeam &&
    !!mode &&
    !!initialTeam &&
    !!bestOfParam;

  if (!hasAllRequired || !validBestOf) {
    return { isEmpty: false, isError: true } as const;
  }

  // 정상 → 밴픽 로직
  return {
    matchId,
    teamName,
    oppositeTeam,
    mode,
    initialTeam,
    isGuest,
    bestOf,
    isEmpty: false,
    isError: false,
  } as const;
};
