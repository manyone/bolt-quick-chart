import { SalesData, ChartData } from '../types/data';

export const parseCSV = (csv: string): SalesData[] => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj: any, header, index) => {
      obj[header] = index === 0 ? values[index] : Number(values[index]);
      return obj;
    }, {});
  });
};

export const getChartColors = () => ({
  online: 'rgba(54, 162, 235, 0.8)',
  retail: 'rgba(255, 99, 132, 0.8)',
});

export const transformDataForCharts = (data: SalesData[]): ChartData => {
  const colors = getChartColors();
  const dates = Object.keys(data[0]).filter(key => key !== 'channel');
  
  return {
    labels: dates,
    datasets: data.map(row => ({
      label: row.channel as string,
      data: dates.map(date => row[date] as number),
      backgroundColor: colors[row.channel as keyof typeof colors],
      borderColor: colors[row.channel as keyof typeof colors],
      fill: false,
    })),
  };
};