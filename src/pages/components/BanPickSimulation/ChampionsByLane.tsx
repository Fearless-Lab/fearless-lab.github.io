import { useMemo } from "react";
import { fetchBanPickBySet } from "@/apis/service/fetchBanPickBySet";
import { useQueries } from "@tanstack/react-query";

import MasterBot from "@/assets/Position_Master-Bot.png";
import MasterJungle from "@/assets/Position_Master-Jungle.png";
import MasterMid from "@/assets/Position_Master-Mid.png";
import MasterSupport from "@/assets/Position_Master-Support.png";
import MasterTop from "@/assets/Position_Master-Top.png";

interface ChampionsByLaneProps {
  matchId: string;
  currentSet: number;
  currentStep: number;
  teamName: string;
  oppositeTeam: string;
  version: string;
}

const ChampionsByLane = ({
  matchId,
  currentSet,
  currentStep,
  teamName,
  oppositeTeam,
  version,
}: ChampionsByLaneProps) => {
  const isCurrentSetFinished = currentStep === 21;

  const queries = useQueries({
    queries: Array.from(
      { length: isCurrentSetFinished ? currentSet : currentSet - 1 },
      (_, i) => {
        const setNum = i + 1;
        return {
          queryKey: ["banPickSet", matchId, setNum],
          queryFn: () =>
            fetchBanPickBySet(matchId, setNum, teamName, oppositeTeam),
          staleTime: Infinity,
        };
      },
    ),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const laneData = useMemo(() => {
    const result = Array.from({ length: 5 }, () => ({
      myTeam: [] as string[],
      enemyTeam: [] as string[],
    }));

    queries.forEach((q) => {
      const data = q.data;
      if (!data) return;

      const myPicks = data.banPickByTeam?.[teamName]?.pick ?? [];
      const enemyPicks = data.banPickByTeam?.[oppositeTeam]?.pick ?? [];

      myPicks.forEach((champ: string, idx: number) => {
        if (idx < 5) result[idx].myTeam.push(champ);
      });

      enemyPicks.forEach((champ: string, idx: number) => {
        if (idx < 5) result[idx].enemyTeam.push(champ);
      });
    });

    return result;
  }, [queries, teamName, oppositeTeam]);

  const laneIcons = [
    MasterTop,
    MasterJungle,
    MasterMid,
    MasterBot,
    MasterSupport,
  ];

  const hasData = queries.length > 0 && queries.some((q) => q.data);

  if (isLoading || isError || !hasData) return null;

  return (
    <div className="mt-4 hidden lg:flex justify-center">
      <div className="inline-grid grid-cols-5 gap-x-8 w-fit text-center">
        {laneIcons.map((icon, laneIndex) => (
          <div key={laneIndex} className="flex flex-col items-center">
            <img
              src={icon}
              alt={`lane-${laneIndex}`}
              className="w-5 mb-2 bg-black/70 rounded"
            />

            <div className="flex">
              {laneData[laneIndex].myTeam.map((champ, idx) => (
                <img
                  key={idx}
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
                  alt={champ}
                  className="w-8"
                />
              ))}
            </div>

            <div className="flex">
              {laneData[laneIndex].enemyTeam.map((champ, idx) => (
                <img
                  key={idx}
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
                  alt={champ}
                  className="w-8"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionsByLane;
