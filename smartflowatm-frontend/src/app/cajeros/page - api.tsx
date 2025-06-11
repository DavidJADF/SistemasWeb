'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchCajeros, Cajero } from '@/lib/api';

export default function CajerosPage() {
  const [cajeros, setCajeros] = useState<Cajero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCajeros()
      .then(data => setCajeros(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Cargando cajeros…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Listado de Cajeros</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efectivo</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cajeros.map(c => (
              <tr key={c.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.ubicacion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${c.efectivo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Link href={`/cajeros/${c.id}`}>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Ver detalles
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}