// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CashPredictionChart from '@/components/CashPredictionChart';
import AlertsChart from '@/components/AlertsChart';

export default function DashboardPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/login');
    } else {
      setAuth(true);
    }
  }, [router]);

  if (!auth) {
    return <p className="p-8">Redirigiendo...</p>;
  }

  // Valores mock para tarjetas
  const totalCajeros = 12;
  const activos = 8;
  const inactivos = 4;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Principal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-2">Cajeros Activos</h2>
          <p className="text-4xl font-bold text-green-600">{activos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-2">Cajeros Inactivos</h2>
          <p className="text-4xl font-bold text-red-600">{inactivos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium mb-2">Total de Cajeros</h2>
          <p className="text-4xl font-bold">{totalCajeros}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashPredictionChart />
        <AlertsChart />
      </div>
    </div>
  );
}
