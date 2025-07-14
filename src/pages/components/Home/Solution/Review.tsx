import { solutionData } from "@constants/solutionData";

const Review = ({ id }: { id: number }) => {
  const { review } = solutionData[id];

  return (
    <>
      <div className="solution-bg p-4 mt-auto text-sm/6 border border-[#02616d]">
        <p className="font-bold">고객 후기</p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent my-2" />
        <p className="text-[#cdcaca]">{review}</p>
      </div>
    </>
  );
};
export default Review;
