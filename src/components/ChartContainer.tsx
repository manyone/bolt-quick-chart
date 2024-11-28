import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut, PolarArea, Radar, Scatter } from 'react-chartjs-2';
import { ChartData } from '../types/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ScatterController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartContainerProps {
  data: ChartData;
  type: 'hbar' | 'vbar' | 'line' | 'scatter' | 'donut' | 'polar' | 'radar';
  stacked?: boolean;
}

export default function ChartContainer({ data, type, stacked = false }: ChartContainerProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: type === 'hbar' || type === 'vbar' ? {
      x: {
        stacked: stacked,
      },
      y: {
        stacked: stacked,
      },
    } : undefined,
  };

  const getChart = () => {
    switch (type) {
      case 'hbar':
        return <Bar data={data} options={{ ...options, indexAxis: 'y' }} />;
      case 'vbar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'scatter':
        return <Scatter data={{
          datasets: data.datasets.map(ds => ({
            ...ds,
            data: ds.data.map((value, index) => ({
              x: index + 1,
              y: value
            }))
          }))
        }} options={options} />;
      case 'donut':
        return <Doughnut data={data} />;
      case 'polar':
        return <PolarArea data={data} />;
      case 'radar':
        return <Radar data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 capitalize">
        {type} Chart {stacked ? '(Stacked)' : ''}
      </h2>
      {getChart()}
    </div>
  );
}