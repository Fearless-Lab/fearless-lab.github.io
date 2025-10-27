type Teams = {
  blue: string;
  red: string;
};

export function getTeamScores(
  winners: string[],
  teams?: Teams
): { blue: number; red: number } {
  if (!teams) return { blue: 0, red: 0 };
  const getWinsOf = (name?: string) => winners.filter((w) => w === name).length;
  return {
    blue: getWinsOf(teams.blue),
    red: getWinsOf(teams.red),
  };
}
