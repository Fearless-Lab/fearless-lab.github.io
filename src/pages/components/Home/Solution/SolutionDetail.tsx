import Goal from "./Goal";
import Graph from "./Graph";
import Review from "./Review";

const SolutionDetail = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
      <div>
        <Goal />
        <Review />
      </div>

      <Graph />
    </div>
  );
};
export default SolutionDetail;
