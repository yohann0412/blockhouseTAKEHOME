import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  width: number;
  height: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => (
  <RechartsPieChart width={width} height={height}>
    <Pie
      data={data}
      cx={width / 2}
      cy={height / 2}
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </RechartsPieChart>
);

export default PieChart;
