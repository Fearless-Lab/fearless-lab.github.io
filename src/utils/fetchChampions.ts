export type Champion = {
  id: string;
  name: string;
};

export type ChampionResponse = {
  data: Record<string, Champion>;
};

export const fetchChampions = async (): Promise<{
  version: string;
  champions: Champion[];
}> => {
  const versionRes = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions: string[] = await versionRes.json();
  const latestVersion = versions[0];

  const champRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
  );
  const data = (await champRes.json()) as ChampionResponse;

  const champions = Object.values(data.data);
  champions.sort((a, b) => a.name.localeCompare(b.name, "ko"));

  return { version: latestVersion, champions };
};
