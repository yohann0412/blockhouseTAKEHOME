import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ErrorBar,
  ComposedChart,
  Line,
  Cell,
  Tooltip,
} from "recharts";

interface CandleStickDataPoint {
  date: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

interface CandleStickProps {
  data: Array<CandleStickDataPoint>;
  colorUp?: string;
  colorDown?: string;
  barWidth?: number;
  lineWidth?: number;
  width: number;
  height: number;
}

const CandleStick: React.FC<CandleStickProps> = ({
  data,
  colorUp = "#00906F",
  colorDown = "#B23507",
  barWidth = 10,
  lineWidth = 3,
  width,
  height,
}) => {
    if (
        !Array.isArray(data) ||
        data.length === 0 ||
        typeof data[0].date !== 'number' ||
        typeof data[0].high !== 'number' ||
        typeof data[0].low !== 'number' ||
        typeof data[0].open !== 'number' ||
        typeof data[0].close !== 'number'
      ) {
        return <div>Invalid data format</div>;
      }
      const transformedData = data.map((point) => ({
        date: point.date,
        low: point.low,
        high: point.high,
        open: point.open,
        close: point.close,
        height: Math.abs(point.close - point.open),
        errorLineHigh: point.high,
        errorLineLow: point.low,
        up: point.close > point.open,
      }));

  const maxHeight = Math.max(...transformedData.map((point) => point.high));
  const minHeight = Math.min(...transformedData.map((point) => point.low));

  return (
    <ComposedChart width={width} height={height} data={transformedData}>
      <CartesianGrid horizontal={false} strokeDasharray="1 15" />
      <XAxis dataKey="date" />
      <YAxis domain={[minHeight - 2, maxHeight + 2]} />
      <Tooltip />
      <Bar dataKey="low" fillOpacity={0} stackId="stack" />
      <Bar dataKey="height" stackId="stack" barSize={barWidth}>
        {transformedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.up ? colorUp : colorDown} />
        ))}
      </Bar>
      <Line
        dataKey="errorLineHigh"
        stroke="none"
        isAnimationActive={false}
        dot={false}
      >
        <ErrorBar
          dataKey="high"
          width={lineWidth}
          strokeWidth={lineWidth - 1}
          stroke={colorDown}
        />
      </Line>
      <Line
        dataKey="errorLineLow"
        stroke="none"
        isAnimationActive={false}
        dot={false}
      >
        <ErrorBar
          dataKey="low"
          width={lineWidth}
          strokeWidth={lineWidth - 1}
          stroke={colorDown}
        />
      </Line>
    </ComposedChart>
  );
};

export default CandleStick;