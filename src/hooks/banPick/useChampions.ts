import { useEffect, useState } from "react";
import { fetchChampions, type Champion } from "@utils/generateRandomNickname";

export function useChampions() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [version, setVersion] = useState("");

  useEffect(() => {
    async function load() {
      const { champions, version } = await fetchChampions();
      setChampions(champions);
      setVersion(version);
    }

    load();
  }, []);

  return { champions, version };
}
