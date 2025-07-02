import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1월", uv: 400 },
  { name: "2월", uv: 300 },
  { name: "3월", uv: 500 },
  { name: "4월", uv: 200 },
  { name: "5월", uv: 278 },
  { name: "6월", uv: 189 },
];

const SimpleLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#027088" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
