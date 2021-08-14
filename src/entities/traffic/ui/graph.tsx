import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Traffic } from "shared/api";
interface Props {
  data: Traffic[];
}

export const TrafficGraph = ({ data }: Props) => {
  return (
    <ResponsiveContainer minWidth="100%" minHeight="280px" height={"100%"}>
      <LineChart data={data}>
        <XAxis dataKey="data" />
        <YAxis />
        <Line type="monotone" dataKey="out" stroke="#8884d8" />
        <Line type="monotone" dataKey="in" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
