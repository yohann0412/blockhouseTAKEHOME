'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandleStick from './Candlestick';
import LineChart from './Linechart';
import BarChart from './Barchart';
import PieChart from './Piechart';

interface ChartData {
  candlestickData: Array<{
    date: string;
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

const Dashboard: React.FC = () => {
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
        console.log(candlestickResponse)

        setChartData({
          candlestickData: candlestickResponse.data.data,
          lineChartData: lineChartResponse.data.labels.map((label: any, index: string | number) => ({
            name: label,
            value: lineChartResponse.data.data[index],
          })),
          barChartData: barChartResponse.data.labels.map((label: any, index: string | number) => ({
            name: label,
            value: barChartResponse.data.data[index],
          })),
          pieChartData: pieChartResponse.data.labels.map((label: any, index: string | number) => ({
            name: label,
            value: pieChartResponse.data.data[index],
          })),
        });


        console.log("All data parsed and set to state:", chartData);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-2xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-black text-xl font-semibold mb-4">Candlestick Chart</h2>
          <CandleStick
            data={chartData.candlestickData}
            width={600}
            height={400}
            colorUp="#00906F"
            colorDown="#B23507"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-black text-xl font-semibold mb-4">Line Chart</h2>
          <LineChart data={chartData.lineChartData} width={600} height={400} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-black text-xl font-semibold mb-4">Bar Chart</h2>
          <BarChart data={chartData.barChartData} width={600} height={400} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-black text-xl font-semibold mb-4">Pie Chart</h2>
          <PieChart data={chartData.pieChartData} width={600} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;