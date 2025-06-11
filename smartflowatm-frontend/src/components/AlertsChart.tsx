// src/components/AlertsChart.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const alertData = [
  { type: 'Bajo Efectivo', count: 4 },
  { type: 'Error Técnico', count: 2 },
  { type: 'Offline', count: 1 },
];

export default function AlertsChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-2">Últimas Alertas</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={alertData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#DC2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}