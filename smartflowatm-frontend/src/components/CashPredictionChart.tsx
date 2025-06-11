// src/components/CashPredictionChart.tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'May 1', predicted: 5000 },
  { date: 'May 2', predicted: 5500 },
  { date: 'May 3', predicted: 5300 },
  { date: 'May 4', predicted: 6000 },
  { date: 'May 5', predicted: 5800 },
];

export default function CashPredictionChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-2">Predicción de Efectivo</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#2563EB"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}