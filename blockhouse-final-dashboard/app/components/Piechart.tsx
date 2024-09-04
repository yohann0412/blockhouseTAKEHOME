import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  width: number;
  height: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const calculatePercentages = (data: Array<{ name: string; value: number }>) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  return data.map(entry => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(2)
  }));
};

const CustomLegend = ({ payload }: any) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {payload.map((entry: any, index: number) => (
          <tr key={`legend-item-${index}`}>
            <td style={{ color: entry.payload.fill }}>{entry.payload.name}</td>
            <td style={{ color: 'black' }}>{entry.payload.percentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
  const dataWithPercentages = calculatePercentages(data);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={dataWithPercentages}
          cx={width / 2}
          cy={height / 2}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {dataWithPercentages.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend content={<CustomLegend />} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
