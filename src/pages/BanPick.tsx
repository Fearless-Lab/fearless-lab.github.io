import HighlightBadge from "@/components/HighlightBadge";
import Infopill from "@/components/Infopill";
import SubInfopill from "@/components/SubInfopill";
import { gameMode, modeDescription } from "@constants/category";
import { useState } from "react";
import CategoryButton from "./components/Home/Community/CategoryButton";

const BanPick = () => {
  const [selectedMode, setSelectedMode] = useState(gameMode[0]);

  const handleCategoryClick = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section
      id="banPick"
      className="flex flex-col items-center justify-center my-48 text-center scroll-mt-20"
    >
      <HighlightBadge>Ban · Pick Simulation</HighlightBadge>

      <Infopill>밴픽 전략을 구상해보세요 !</Infopill>
      <SubInfopill>{modeDescription[selectedMode]}</SubInfopill>

      <div className="flex gap-3 flex-nowrap justify-center">
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
    </section>
  );
};
export default BanPick;
