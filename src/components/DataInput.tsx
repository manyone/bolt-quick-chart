import React from 'react';

interface DataInputProps {
  value: string;
  onChange: (value: string) => void;
}

const defaultData = `channel,1/1/2024,2/1/2024,3/1/2024,4/1/2024,5/1/2024
online,114,154,125,140,112
retail,129,128,144,161,184`;

export default function DataInput({ value, onChange }: DataInputProps) {
  return (
    <div className="w-full mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Data Input (CSV format)
      </label>
      <textarea
        className="w-full h-32 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter CSV data..."
      />
    </div>
  );
}