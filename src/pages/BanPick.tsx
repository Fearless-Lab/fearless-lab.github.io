import HighlightBadge from "@/components/HighlightBadge";
import Infopill from "@/components/Infopill";
import SubInfopill from "@/components/SubInfopill";
import { gameMode, modeDescription } from "@constants/category";
import { useRef, useState } from "react";
import CategoryButton from "./components/Community/CategoryButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CTAButton from "@/components/CTAButton";
import { useScrollReveal } from "@/hooks/animation/useScrollReveal";
import BanPickNoticeModal from "@componentsAboutBanPick/BanPickStartModal";
import { v4 as uuidv4 } from "uuid";

const BanPick = () => {
  const [selectedMode, setSelectedMode] = useState(gameMode[0]);

  const [blueTeamName, setBlueTeamName] = useState("");
  const [redTeamName, setRedTeamName] = useState("");
  const [matchId, setMatchId] = useState("");

  const [openNotice, setOpenNotice] = useState(false);

  const [error, setError] = useState<{ blue?: string; red?: string }>({});

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
      {/* ref) https://ko.react.dev/reference/react-dom/components/title */}
      <title>피어리스 | 밴픽 URL 생성</title>

      <section
        id="banPick"
        ref={sectionRef}
        className="flex flex-col items-center justify-center my-28 text-center scroll-mt-20"
      >
        <HighlightBadge>LOL Ban · Pick Simulation</HighlightBadge>

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

        <div className="w-[90%] md:w-full max-w-md flex gap-4 py-5">
          <div className="flex flex-col text-left">
            <Label className="text-white mb-2">블루팀</Label>
            <Input
              className="h-12 px-4 text-sm bg-blue-400 text-white placeholder:text-blue-100 placeholder:text-xs md:placeholder:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 hover:brightness-110 transition-all duration-200 border-none"
              placeholder="블루팀 이름을 지어주세요 !"
              value={blueTeamName}
              onChange={(e) => setBlueTeamName(e.target.value)}
            />
            {error.blue && (
              <p className="text-red-400 text-xs mt-1">{error.blue}</p>
            )}
          </div>

          <div className="flex flex-col text-left mb-4">
            <Label className="text-white mb-2">레드팀</Label>
            <Input
              className="h-12 px-4 text-sm bg-red-400 text-white placeholder:text-red-100 placeholder:text-xs md:placeholder:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 hover:brightness-110 transition-all duration-200 border-none"
              placeholder="레드팀 이름을 지어주세요 !"
              value={redTeamName}
              onChange={(e) => setRedTeamName(e.target.value)}
            />
            {error.red && (
              <p className="text-red-400 text-xs mt-1">{error.red}</p>
            )}
          </div>
        </div>

        <CTAButton onClick={handleStart}>시작하기</CTAButton>
      </section>

      <BanPickNoticeModal
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        blueTeamName={blueTeamName.trim()}
        redTeamName={redTeamName.trim()}
        matchId={matchId}
        mode={selectedMode}
      />
    </>
  );
};

export default BanPick;
