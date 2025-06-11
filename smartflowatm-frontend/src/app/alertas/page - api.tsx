'use client';

import { useEffect, useState } from 'react';
import { fetchAlertas, programarDotacion, Alerta } from '@/lib/api';

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [fecha, setFecha] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });

  useEffect(() => {
    fetchAlertas().then(data => {
      setAlertas(data);
      setLoading(false);
    });
  }, []);

  const toggle = (id: string) => {
    setSeleccionadas(sel =>
      sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
    );
  };

  const handleProgramar = async () => {
    const orden = await programarDotacion(seleccionadas, fecha);
    const fresh = await fetchAlertas();
    setAlertas(fresh);
    setSeleccionadas([]);
    alert(`Orden ${orden} creada`);
  };

  if (loading) return <p className="p-8">Cargando alertas…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Alertas</h1>
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="border rounded p-2"
        />
        <button
          onClick={handleProgramar}
          disabled={!seleccionadas.length}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Programar servicio
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-50">
          <tr>
            <th></th><th>ID Alerta</th><th>ATM ID</th><th>Ubicación</th><th>Efectivo Restante</th><th>Fecha Predicción</th><th>Orden ID</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map(a => (
            <tr key={a.id} className="divide-y divide-gray-200">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={seleccionadas.includes(a.id)}
                  onChange={() => toggle(a.id)}
                />
              </td>
              <td className="px-4 py-2">{a.id}</td>
              <td className="px-4 py-2">{a.atmId}</td>
              <td className="px-4 py-2">{a.ubicacion}</td>
              <td className="px-4 py-2">${a.efectivoRestante}</td>
              <td className="px-4 py-2">{a.fechaPrediccion}</td>
              <td className="px-4 py-2">{a.ordenId || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}