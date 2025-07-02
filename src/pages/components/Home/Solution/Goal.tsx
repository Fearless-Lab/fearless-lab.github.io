import {
  solutionCategory,
  solutionData,
} from "../../../../../constants/solutionData";

const Goal = ({ id }: { id: number }) => {
  const { title, detail, results } = solutionData[id];

  return (
    <>
      <div className="space-y-2 text-sm/6">
        <p className="text-[#19bcd9] text-lg">{title}</p>
        <p>{detail}</p>
        {results.map((result, idx) => (
          <p key={`${solutionCategory[id]}+${idx}`}>
            {result.explanation}{" "}
            <span className="text-[#19bcd9]">{result.amount}</span>
          </p>
        ))}
      </div>
    </>
  );
};
export default Goal;
