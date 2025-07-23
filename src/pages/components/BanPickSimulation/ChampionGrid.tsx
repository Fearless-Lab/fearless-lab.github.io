import { fetchChampions } from "@/utils/generateRandomNickname";
import { useEffect, useState } from "react";

interface Champion {
  id: string;
  name: string;
}

interface ChampionGridProps {
  searchTerm: string;
}

export default function ChampionGrid({ searchTerm }: ChampionGridProps) {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    async function load() {
      const { version, champions } = await fetchChampions();
      setVersion(version);
      setChampions(champions);
    }

    load();
  }, []);

  const filteredChampions = searchTerm
    ? champions.filter((champ) =>
        champ.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : champions;

  return (
    <div
      className="grid justify-center auto-rows-[64px] grid-flow-row gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, 64px)" }}
    >
      {filteredChampions.map((champ) => (
        <div
          key={champ.id}
          className="w-16 flex flex-col items-center cursor-pointer"
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
            alt={champ.name}
            className="w-16 h-16 object-cover"
          />
          <div className="text-[9px] text-center w-full">{champ.name}</div>
        </div>
      ))}
    </div>
  );
}
