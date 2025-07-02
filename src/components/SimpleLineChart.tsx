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
  { name: "1월", uv: 200, pv: 150 },
  { name: "2월", uv: 100, pv: 180 },
  { name: "3월", uv: 180, pv: 130 },
  { name: "4월", uv: 120, pv: 190 },
  { name: "5월", uv: 160, pv: 140 },
  { name: "6월", uv: 130, pv: 170 },
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
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
