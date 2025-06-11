// src/app/alertas/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface Alerta {
  id: string;
  atmId: string;
  ubicacion: string;
  efectivoRestante: number;
  fechaPrediccion: string;
  ordenId: string;
  programada: boolean;
}

export default function AlertasPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState('');

  // Estado de alertas para poder modificar "programada"
  const [alertas, setAlertas] = useState<Alerta[]>([
    { id: 'ALR-001', atmId: 'ATM-002', ubicacion: 'Sucursal Norte', efectivoRestante: 1200, fechaPrediccion: '2025-05-14', ordenId: '', programada: false },
    { id: 'ALR-002', atmId: 'ATM-003', ubicacion: 'Sucursal Sur',   efectivoRestante: 800,  fechaPrediccion: '2025-05-13', ordenId: 'ORD-1002', programada: true },
    { id: 'ALR-003', atmId: 'ATM-001', ubicacion: 'Sucursal Centro',efectivoRestante: 500,  fechaPrediccion: '2025-05-12', ordenId: 'ORD-1003', programada: true },
	{ id: 'ALR-004', atmId: 'ATM-004', ubicacion: 'Sucursal Norte', efectivoRestante: 200, fechaPrediccion: '2025-05-14', ordenId: '', programada: false },
    { id: 'ALR-005', atmId: 'ATM-005', ubicacion: 'Sucursal Sur',   efectivoRestante: 300,  fechaPrediccion: '2025-05-13', ordenId: '', programada: false },
    { id: 'ALR-006', atmId: 'ATM-006', ubicacion: 'Sucursal Centro',efectivoRestante: 100,  fechaPrediccion: '2025-05-12', ordenId: '', programada: false },
  ]);

  // Selección de alertas
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Fecha de programación (por defecto hoy + 3 días)
  const [programDate, setProgramDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });

  // Contador para generar nuevos ordenId
  const [lastOrderNum, setLastOrderNum] = useState(1003);

  // Autenticación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) router.replace('/login');
    else setAuth(true);
  }, [router]);

    // Ordenar por fechaPrediccion ascendente
  const sorted = useMemo(() => {
    return [...alertas].sort((a, b) => new Date(a.fechaPrediccion).getTime() - new Date(b.fechaPrediccion).getTime());
  }, [alertas]);

  // Filtrar solo alertas pendientes y por búsqueda
  const filtered = useMemo(() => {
    return sorted
      .filter((a) => !a.programada)
      .filter((a) => a.atmId.toLowerCase().includes(search.toLowerCase()));
  }, [sorted, search]);

  if (!auth) return <p className="p-8">Redirigiendo...</p>;

  // Manejo de selección
  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelected(new Set(filtered.map(a => a.id)));
    else setSelected(new Set());
  };
  const toggleOne = (id: string) => {
    const s = new Set(selected);
    if (s.has(id)) {
	  s.delete(id);
	} else {
	  s.add(id);
	}
    setSelected(s);
  };

  // Programar servicio
  const programService = () => {
    const newNum = lastOrderNum + 1;
    const newOrderId = `ORD-${newNum}`;
    const updated = alertas.map(a =>
      selected.has(a.id)
        ? { ...a, ordenId: newOrderId, programada: true, fechaPrediccion: programDate }
        : a
    );
    setAlertas(updated);
    setLastOrderNum(newNum);

    // Generar hoja de servicio en PDF
    const doc = new jsPDF();
    doc.text(`Orden de Dotación ${newOrderId}`, 14, 16);
    autoTable(doc, {
      head: [['ATM ID', 'Ubicación', 'Efectivo', 'Fecha Dotación']],
      body: updated
        .filter(a => a.ordenId === newOrderId)
        .map(a => [a.atmId, a.ubicacion, a.efectivoRestante, a.fechaPrediccion]),
      startY: 24,
    });
    doc.save(`orden_${newOrderId}.pdf`);

    // Simula envío de email
    console.log(`Email enviado a transportadora: Orden ${newOrderId}`);

    // Limpia selección
    setSelected(new Set());
  };

  // Exportar Excel y PDF existentes
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filtered.map(a => ({
        'ATM ID': a.atmId,
        'Ubicación': a.ubicacion,
        'Efectivo Restante': a.efectivoRestante,
        'Próx. Dotación': a.fechaPrediccion,
        'Orden ID': a.ordenId,
        'Programada': a.programada ? 'Sí' : 'No',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alertas');
    XLSX.writeFile(wb, 'alertas_dotacion.xlsx');
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Alertas de Dotación', 14, 16);
    autoTable(doc, {
      head: [[
        'ATM ID', 'Ubicación', 'Efectivo', 'Próx. Dotación', 'Orden ID', 'Programada'
      ]],
      body: filtered.map(a => [
        a.atmId,
        a.ubicacion,
        a.efectivoRestante,
        a.fechaPrediccion,
        a.ordenId,
        a.programada ? 'Sí' : 'No',
      ]),
      startY: 24,
    });
    doc.save('alertas_dotacion.pdf');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Alertas de Dotación</h1>

      {/* Controles */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Buscar por ATM ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded p-2 w-full md:w-1/3"
        />
        <div className="flex items-center gap-2">
          <label>
            Fecha de dotación:
            <input
              type="date"
              value={programDate}
              onChange={e => setProgramDate(e.target.value)}
              className="border rounded p-2 ml-2"
            />
          </label>
          <button
            onClick={programService}
            disabled={selected.size === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            type="button"
          >
            Programar servicio
          </button>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white rounded"
            type="button"
          >
            Exportar Excel
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-red-600 text-white rounded"
            type="button"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Tabla con selección */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={selected.size > 0 && filtered.every(a => selected.has(a.id))}
                />
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">ATM ID</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Ubicación</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Efectivo</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Próx. Dotación</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Orden ID</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Programada</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(a => (
              <tr key={a.id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggleOne(a.id)}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{a.atmId}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.ubicacion}</td>
                <td className="px-4 py-2 text-sm text-gray-700">${a.efectivoRestante}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.fechaPrediccion}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.ordenId}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.programada ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}