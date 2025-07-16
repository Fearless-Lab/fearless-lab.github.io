import HighlightBadge from "@commonComponents/HighlightBadge";
import Infopill from "@commonComponents/Infopill";
import SolutionDetail from "./Solution/SolutionDetail";

const Community = () => {
  return (
    <section
      className="flex flex-col items-center justify-center my-48 px-4 text-center flex-wrap scroll-mt-20"
      id="community"
    >
      <HighlightBadge>Community</HighlightBadge>

      <Infopill>함께 할 소환사를 구해보세요</Infopill>

      <SolutionDetail />
    </section>
  );
};

export default Community;
