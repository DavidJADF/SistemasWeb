// ================================
// src/app/usuarios/page.tsx
// ================================

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchUsuarios, deleteUsuario, Usuario } from '@/lib/api';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios()
      .then(data => setUsuarios(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    await deleteUsuario(id);
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  if (loading) return <p className="p-8">Cargando usuarios…</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link href="/usuarios/nuevo">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Añadir Usuario
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activo</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map(u => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.rol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.activo ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <Link href={`/usuarios/${u.id}/editar`}>
                    <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    type="button"
                  >
                    Eliminar
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