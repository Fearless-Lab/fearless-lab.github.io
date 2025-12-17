export interface Item {
  id: string;
  name: string;
  image: string;
}

export const fetchItems = async (): Promise<{
  items: Item[];
  version: string;
}> => {
  const versionRes = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions: string[] = await versionRes.json();
  const latestVersion = versions[0];

  const itemRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`
  );
  const data = await itemRes.json();

  // 협곡에 없는 아이템
  const bannedItemNames = [
    "개척자",
    "아트마의 심판",
    "불사대마왕의 왕관",
    "용암의 방패",
    "별빛밤 망토",
    "신성의 검",
    "베이가의 승천의 부적",
    "서풍",
    "꽃피는 새벽의 검",
    "부서진 여왕의 왕관",
    "도박꾼의 칼날",
    "잔혹 행위",
    "살점포식자",
  ];

  const items: Item[] = Object.entries(data.data)
    .map(([id, itemData]: [string, any]) => ({
      id,
      name: itemData.name,
      image: itemData.image.full,
    }))
    .filter((item) => {
      const itemData = data.data[item.id];

      if (bannedItemNames.includes(item.name)) {
        return false;
      }

      const bannedTags = ["Consumable", "Trinket"];
      if (itemData.tags?.some((tag: string) => bannedTags.includes(tag))) {
        return false;
      }

      if (!itemData.gold?.total || itemData.gold.total < 500) {
        return false;
      }

      if (!itemData.gold?.purchasable) {
        return false;
      }

      if (itemData.maps && itemData.maps["11"] === false) {
        return false;
      }

      return true;
    });

  return { items, version: latestVersion };
};
