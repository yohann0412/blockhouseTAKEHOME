'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandleStick from './Candlestick';
import LineChart from './Linechart';
import BarChart from './Barchart';
import PieChart from './Piechart';

interface ChartData {
  candlestickData: Array<{
    date: number;
    high: number;
    low: number;
    open: number;
    close: number;
  }>;
  lineChartData: Array<{ name: string; value: number }>;
  barChartData: Array<{ name: string; value: number }>;
  pieChartData: Array<{ name: string; value: number }>;
}

// Define the base URL
const BASE_URL = 'http://localhost:8000/api';

export default function Dashboard() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");

        const [candlestickResponse, lineChartResponse, barChartResponse, pieChartResponse] = await Promise.all([
          axios.get(`${BASE_URL}/candlestick-data/`),
          axios.get(`${BASE_URL}/line-chart-data/`),
          axios.get(`${BASE_URL}/bar-chart-data/`),
          axios.get(`${BASE_URL}/pie-chart-data/`)
        ]);

        console.log("Candlestick data fetched:", candlestickResponse.data);
        console.log("Line chart data fetched:", lineChartResponse.data);
        console.log("Bar chart data fetched:", barChartResponse.data);
        console.log("Pie chart data fetched:", pieChartResponse.data);

        // Process candlestick data
        // Process candlestick data
const candlestickData = Array.isArray(candlestickResponse.data.data)
? candlestickResponse.data.data.map((item: { date: string | number | Date; open: any; high: any; low: any; close: any; }) => ({
    date: new Date(item.date).getTime(),  // Change 'x' to 'date'
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
  }))
: [];
        // Process line chart data
        const lineChartData = lineChartResponse.data.labels.map((label: any, index: string | number) => ({
          name: label,
          value: lineChartResponse.data.data[index],
        }));

        // Process bar chart data
        const barChartData = barChartResponse.data.labels.map((label: any, index: string | number) => ({
          name: label,
          value: barChartResponse.data.data[index],
        }));

        // Process pie chart data
        const pieChartData = pieChartResponse.data.labels.map((label: any, index: string | number) => ({
          name: label,
          value: pieChartResponse.data.data[index],
        }));

        // Set the processed data to state
        setChartData({
          candlestickData,
          lineChartData,
          barChartData,
          pieChartData,
        });

        console.log("All data parsed and set to state:", {
          candlestickData,
          lineChartData,
          barChartData,
          pieChartData,
        });

        setLoading(false);
        console.log("Loading state set to false.");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!chartData) {
    return <div className="text-center py-10">No data available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Candlestick Chart</h2>
        <CandleStick
  data={chartData.candlestickData}
  width={400}
  height={300}
  colorUp="#00906F"
  colorDown="#B23507"
/>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
        <LineChart data={chartData.lineChartData} width={400} height={300} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <BarChart data={chartData.barChartData} width={400} height={300} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
        <PieChart data={chartData.pieChartData} width={400} height={300} />
      </div>
    </div>
  );
}