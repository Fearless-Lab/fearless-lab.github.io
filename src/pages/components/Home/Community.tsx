import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import CommunityDetail from "./Community/CommunityDetail";

const Community = () => {
  return (
    <section
      className="flex flex-col items-center justify-center my-48 text-center scroll-mt-20"
      id="community"
    >
      <HighlightBadge>Community</HighlightBadge>

      <Infopill>함께 할 소환사를 구해보세요</Infopill>

      <CommunityDetail />
    </section>
  );
};

export default Community;
