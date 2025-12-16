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

  const items: Item[] = Object.entries(data.data)
    .map(([id, itemData]: [string, any]) => ({
      id,
      name: itemData.name,
      image: itemData.image.full,
    }))
    .filter((item) => {
      const itemData = data.data[item.id];

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
