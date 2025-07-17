import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import CommunityDetail from "./Community/CommunityDetail";
import { useParams } from "react-router-dom";
import SubInfopill from "@/components/SubInfopill";
import { categoryGuideText } from "@constants/category";

const Community = () => {
  const { category } = useParams();

  return (
    <section
      className="flex flex-col items-center justify-center my-48 text-center scroll-mt-20"
      id="community"
    >
      <HighlightBadge>Community</HighlightBadge>

      <Infopill>함께 할 소환사를 구해보세요</Infopill>
      <SubInfopill>
        {category && category in categoryGuideText
          ? categoryGuideText[category as keyof typeof categoryGuideText]
          : "게시글을 작성해주세요."}
      </SubInfopill>

      <CommunityDetail />
    </section>
  );
};

export default Community;
