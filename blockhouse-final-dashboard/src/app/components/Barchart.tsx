import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  width: number;
  height: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => (
  <RechartsBarChart width={width} height={height} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </RechartsBarChart>
);

export default BarChart;
