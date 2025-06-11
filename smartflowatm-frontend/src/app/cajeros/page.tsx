// src/app/cajeros/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Cajero {
  id: string;
  ubicacion: string;
  estado: 'Activo' | 'Inactivo';
  nivelEfectivo: number;
}

export default function CajerosPage() {
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

  // Datos mock de cajeros
  const cajeros: Cajero[] = [
    { id: 'ATM-001', ubicacion: 'Sucursal Centro', estado: 'Activo', nivelEfectivo: 7500 },
    { id: 'ATM-002', ubicacion: 'Sucursal Norte', estado: 'Inactivo', nivelEfectivo: 0 },
    { id: 'ATM-003', ubicacion: 'Sucursal Sur', estado: 'Activo', nivelEfectivo: 6200 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Listado de Cajeros</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efectivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cajeros.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.ubicacion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={
                      c.estado === 'Activo'
                        ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                        : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
                    }
                  >
                    {c.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${c.nivelEfectivo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
					  type="button"
					  onClick={() => router.push(`/cajeros/${c.id}`)}
					  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
					  Ver detalles
				  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
