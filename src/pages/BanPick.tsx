import HighlightBadge from "@/components/HighlightBadge";
import Infopill from "@/components/Infopill";
import SubInfopill from "@/components/SubInfopill";
import {
  gameMode,
  modeDescription,
  modeExtraDescription,
} from "@constants/category";
import { useRef, useState } from "react";
import CategoryButton from "./components/Community/CategoryButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CTAButton from "@/components/CTAButton";
import { useScrollReveal } from "@/hooks/animation/useScrollReveal";
import BanPickNoticeModal from "@/pages/components/BanPick/BanPickNoticeModal";
import { v4 as uuidv4 } from "uuid";
import { BestOfSelector } from "./components/BanPick/BestOfSelector";

const BanPick = () => {
  const [selectedMode, setSelectedMode] = useState(gameMode[0]);

  const [blueTeamName, setBlueTeamName] = useState("");
  const [redTeamName, setRedTeamName] = useState("");
  const [matchId, setMatchId] = useState("");

  const [openNotice, setOpenNotice] = useState(false);

  const [error, setError] = useState<{ blue?: string; red?: string }>({});

  const [bestOf, setBestOf] = useState(5);

  const handleCategoryClick = (mode: string) => {
    setSelectedMode(mode);
  };

  const handleStart = () => {
    const trimmedBlue = blueTeamName.trim();
    const trimmedRed = redTeamName.trim();

    const newError: { blue?: string; red?: string } = {};

    if (!trimmedBlue) newError.blue = "블루팀 이름을 입력해주세요";
    else if (trimmedBlue.length > 8)
      newError.blue = "최대 8자까지 입력 가능해요";

    if (!trimmedRed) newError.red = "레드팀 이름을 입력해주세요";
    else if (trimmedRed.length > 8) newError.red = "최대 8자까지 입력 가능해요";

    if (
      trimmedBlue &&
      trimmedRed &&
      trimmedBlue === trimmedRed &&
      !newError.blue &&
      !newError.red
    ) {
      newError.blue = newError.red = "팀 이름은 서로 달라야 해요";
    }

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const newMatchId = uuidv4();
    setMatchId(newMatchId);
    setOpenNotice(true);
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <>
      <title>모의 밴픽 | 시작하기</title>
      <meta
        name="description"
        content="팀 이름을 입력하고 롤 모의 밴픽을 시작하세요. Best of 3/5 경기 모드를 선택하고 실시간으로 밴픽 전략을 구상할 수 있습니다."
      />
      <meta
        name="keywords"
        content="롤 밴픽 시작, 팀 전략 구상, 밴픽 전략, Best of 5, 진영 선택, 롤 시뮬레이터 시작"
      />
      <link rel="canonical" href="https://fearless-lab.github.io/banPick" />

      <section
        id="banPick"
        ref={sectionRef}
        className="flex flex-col items-center justify-center my-28 text-center scroll-mt-20"
      >
        <HighlightBadge>롤 모의 밴픽 시뮬레이터</HighlightBadge>

        <Infopill>밴픽 전략을 구상해보세요</Infopill>
        <SubInfopill>
          경기는 최대 5판까지 진행되며, 진 팀에게 진영 선택권이 있어요
          <br />1 세트의 블루 · 레드 진영은 서로 합의해서 정해주세요 !
        </SubInfopill>

        <div className="flex gap-3 flex-nowrap justify-center mb-6">
          {gameMode.map((mode) => {
            const isSelected = mode === selectedMode;

            return (
              <CategoryButton
                key={mode}
                label={mode}
                isSelected={isSelected}
                onClick={() => handleCategoryClick(mode)}
              />
            );
          })}
        </div>

        <SubInfopill>{modeDescription[selectedMode]}</SubInfopill>
        <SubInfopill>{modeExtraDescription[selectedMode]}</SubInfopill>

        <div className="w-full max-w-md flex gap-4 py-5 justify-center">
          <div className="flex flex-col text-left flex-1">
            <Label className="text-white mb-2">블루팀</Label>
            <Input
              className="h-12 px-4 text-sm bg-gradient-to-l from-blue-400/40 via-blue-500/50 to-blue-700/60 backdrop-blur-md border border-white/10 shadow-lg text-white placeholder:text-blue-100 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 hover:brightness-110 transition-all duration-200"
              placeholder="블루팀 이름을 지어주세요 !"
              value={blueTeamName}
              onChange={(e) => setBlueTeamName(e.target.value)}
            />
            {error.blue && (
              <p className="text-red-400 text-xs mt-1">{error.blue}</p>
            )}
          </div>

          <div className="flex flex-col text-left flex-1">
            <Label className="text-white mb-2">레드팀</Label>
            <Input
              className="h-12 px-4 text-sm bg-gradient-to-r from-rose-400/40 via-rose-500/50 to-rose-700/60 backdrop-blur-md border border-white/10 shadow-lg text-white placeholder:text-rose-100 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 hover:brightness-110 transition-all duration-200"
              placeholder="레드팀 이름을 지어주세요 !"
              value={redTeamName}
              onChange={(e) => setRedTeamName(e.target.value)}
            />
            {error.red && (
              <p className="text-red-400 text-xs mt-1">{error.red}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <BestOfSelector bestOf={bestOf} onSelect={setBestOf} />
          <CTAButton onClick={handleStart}>시작하기</CTAButton>
        </div>
      </section>

      <BanPickNoticeModal
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        blueTeamName={blueTeamName.trim()}
        redTeamName={redTeamName.trim()}
        matchId={matchId}
        mode={selectedMode}
        bestOf={bestOf}
      />
    </>
  );
};

export default BanPick;
