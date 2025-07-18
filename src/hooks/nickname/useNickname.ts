import { getOrCreateNickname } from "@/utils/generateRandomNickname";
import { useState, useEffect } from "react";

export const useNickname = () => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    getOrCreateNickname().then(setNickname);
  }, []);

  return nickname;
};
