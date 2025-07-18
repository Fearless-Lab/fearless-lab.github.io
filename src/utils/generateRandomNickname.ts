import { adjectives } from "./../../constants/adjectives";
const NICKNAME_KEY = "userNickname";

interface Champion {
  name: string;
  // 필요한 다른 프로퍼티가 있다면 추가
}

interface ChampionResponse {
  data: Record<string, Champion>;
  // 다른 필드가 있다면 추가
}

export const fetchChampionNames = async (): Promise<string[]> => {
  const versionRes = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions: string[] = await versionRes.json();
  const latestVersion = versions[0];

  const champRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
  );
  const data = (await champRes.json()) as ChampionResponse;

  return Object.values(data.data).map((champ) => champ.name);
};

// 닉네임 생성
export const generateNickname = (champions: string[]): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const champion = champions[Math.floor(Math.random() * champions.length)];
  return `${adjective} ${champion}`;
};

// 닉네임 가져오기 또는 생성
export const getOrCreateNickname = async (): Promise<string> => {
  const stored = localStorage.getItem(NICKNAME_KEY);
  if (stored) return stored;

  const champions = await fetchChampionNames();
  const nickname = generateNickname(champions);
  localStorage.setItem(NICKNAME_KEY, nickname);
  return nickname;
};
