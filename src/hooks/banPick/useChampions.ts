import { useEffect, useState } from "react";
import { fetchChampions, type Champion } from "@utils/generateRandomNickname";

export function useChampions(enabled: boolean = true) {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (!enabled) return;

    async function load() {
      const { champions, version } = await fetchChampions();
      setChampions(champions);
      setVersion(version);
    }

    load();
  }, [enabled]);

  return { champions, version };
}
