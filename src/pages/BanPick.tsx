import HighlightBadge from "@/components/HighlightBadge";
import Infopill from "@/components/Infopill";
import SubInfopill from "@/components/SubInfopill";
import { gameMode, modeDescription } from "@constants/category";
import { useState } from "react";
import CategoryButton from "./components/Home/Community/CategoryButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CTAButton from "@/components/CTAButton";

const BanPick = () => {
  const [selectedMode, setSelectedMode] = useState(gameMode[0]);

  const [blueTeamName, setBlueTeamName] = useState("");
  const [redTeamName, setRedTeamName] = useState("");

  const handleStart = () => {
    // const finalBlue = blueTeamName || "BLUE TEAM";
    // const finalRed = redTeamName || "RED TEAM";
    alert("금방 만들게요");
  };

  const handleCategoryClick = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section
      id="banPick"
      className="flex flex-col items-center justify-center my-36 text-center scroll-mt-20"
    >
      <HighlightBadge>Ban · Pick Simulation</HighlightBadge>

      <Infopill>밴픽 전략을 구상해보세요 !</Infopill>
      <SubInfopill>
        경기는 5판 3선승제로 진행돼요
        <br />
        1세트의 블루 / 레드 진영은 서로 합의해서 정해주세요 !
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
      <div className="w-[90%] md:w-full max-w-md flex flex-col gap-4 py-5">
        <div className="flex flex-col text-left">
          <Label className="text-white mb-2">블루팀</Label>
          <Input
            className="h-12 px-4 bg-blue-500 text-white placeholder:text-blue-100 placeholder:text-xs md:placeholder:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 hover:brightness-110 transition-all duration-200 border-none"
            placeholder="블루팀 이름을 지어주세요! 기본값은 BLUE에요"
            value={blueTeamName}
            onChange={(e) => setBlueTeamName(e.target.value)}
          />
        </div>

        <div className="flex flex-col text-left mb-4">
          <Label className="text-white mb-2">레드팀</Label>
          <Input
            className="h-12 px-4 bg-red-500 text-white placeholder:text-red-100 placeholder:text-xs md:placeholder:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 hover:brightness-110 transition-all duration-200 border-none"
            placeholder="레드팀 이름을 지어주세요! 기본값은 RED에요"
            value={redTeamName}
            onChange={(e) => setRedTeamName(e.target.value)}
          />
        </div>

        <CTAButton onClick={handleStart}>시작하기</CTAButton>
      </div>
    </section>
  );
};
export default BanPick;
