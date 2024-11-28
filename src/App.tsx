import React from 'react';
import { useState } from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import DataInput from './components/DataInput';
import ChartContainer from './components/ChartContainer';
import { parseCSV, transformDataForCharts } from './utils/chartUtils';

function App() {
  const [data, setData] = useState(`channel,1/1/2024,2/1/2024,3/1/2024,4/1/2024,5/1/2024
online,114,154,125,140,112
retail,129,128,144,161,184`);

  const parsedData = parseCSV(data);
  const chartData = transformDataForCharts(parsedData);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <BarChart className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Sales Data Visualization</h1>
        </div>

        <DataInput value={data} onChange={setData} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartContainer data={chartData} type="hbar" />
          <ChartContainer data={chartData} type="hbar" stacked={true} />
          <ChartContainer data={chartData} type="vbar" />
          <ChartContainer data={chartData} type="vbar" stacked={true} />
          <ChartContainer data={chartData} type="line" />
          <ChartContainer data={chartData} type="scatter" />
          <ChartContainer data={chartData} type="donut" />
          <ChartContainer data={chartData} type="polar" />
          <ChartContainer data={chartData} type="radar" />
        </div>
      </div>
    </div>
  );
}

export default App;
