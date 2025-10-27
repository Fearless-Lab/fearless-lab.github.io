interface Teams {
  blue: string;
  red: string;
}

export function checkTeam(
  teams?: Teams,
  teamName?: string
): "blue" | "red" | undefined {
  if (!teams || !teamName) return undefined;
  return teams.blue === teamName ? "blue" : "red";
}
