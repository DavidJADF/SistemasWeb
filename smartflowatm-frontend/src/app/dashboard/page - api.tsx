'use client';

import { useEffect, useState } from 'react';
import { fetchDashboardStats, DashboardStats } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Cargando estadísticas…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Cajeros Activos</p>
          <p className="text-2xl">{stats?.activos ?? 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Cajeros Inactivos</p>
          <p className="text-2xl">{stats?.inactivos ?? 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Total Cajeros</p>
          <p className="text-2xl">{stats?.totalCajeros ?? 0}</p>
        </div>
      </div>
    </div>
  );
}