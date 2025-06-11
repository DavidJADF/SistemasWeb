// src/app/cajeros/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import MapPlaceholder from '@/components/MapPlaceholder';

export default function CajeroDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // Mock “base de datos” con todos los cajeros
  const data: Record<string, { ubicacion: string; estado: string; nivelEfectivo: number; lat: number; lng: number; }> = {
    'ATM-001': { ubicacion: 'Sucursal Centro', estado: 'Activo',   nivelEfectivo: 7500, lat: 40.7128, lng: -74.0060 },
    'ATM-002': { ubicacion: 'Sucursal Norte', estado: 'Inactivo', nivelEfectivo:    0, lat: 40.7306, lng: -73.9352 },
    'ATM-003': { ubicacion: 'Sucursal Sur',   estado: 'Activo',   nivelEfectivo: 6200, lat: 40.6596, lng: -73.9338 },
  };

  const cajero = data[id || ''];

  if (!cajero) {
    return (
      <div className="p-8">
        <p className="text-red-600">Cajero &quot;{id}&quot; no encontrado.</p>
        <button
          onClick={() => router.push('/cajeros')}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          type="button"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Detalle del Cajero {id}</h1>
      <p><strong>Ubicación:</strong> {cajero.ubicacion}</p>
      <p><strong>Estado:</strong> {cajero.estado}</p>
      <p><strong>Nivel de Efectivo:</strong> ${cajero.nivelEfectivo}</p>
      <MapPlaceholder lat={cajero.lat} lng={cajero.lng} />
      <button
        onClick={() => router.push('/cajeros')}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        type="button"
      >
        Volver a la lista
      </button>
    </div>
  );
}
