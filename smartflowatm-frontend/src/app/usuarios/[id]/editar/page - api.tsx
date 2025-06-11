// ============================================
// src/app/usuarios/[id]/editar/page.tsx
// ============================================

'use client';

import { useParams, useRouter } from 'next/navigation';
import { fetchUsuarios, updateUsuario, Usuario } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function EditarUsuarioPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({ id: '', nombre: '', email: '', rol: 'Operador', activo: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios().then(all => {
      const found = all.find(u => u.id === id);
      if (found) setUsuario(found);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async () => {
    await updateUsuario(usuario);
    router.push('/usuarios');
  };

  if (loading) return <p className="p-8">Cargando usuario…</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario {id}</h1>

      <label className="block mb-3">
        Nombre
        <input
          type="text"
          value={usuario.nombre}
          onChange={e => setUsuario(prev => ({ ...prev, nombre: e.target.value }))}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-3">
        Email
        <input
          type="email"
          value={usuario.email}
          onChange={e => setUsuario(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-3">
        Rol
        <select
          value={usuario.rol}
          onChange={e => setUsuario(prev => ({ ...prev, rol: e.target.value }))}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="Admin">Admin</option>
          <option value="Operador">Operador</option>
        </select>
      </label>

      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={usuario.activo}
          onChange={e => setUsuario(prev => ({ ...prev, activo: e.target.checked }))}
          className="mr-2"
        />
        Activo
      </label>

      <div className="flex justify-between">
        <button
          onClick={() => router.push('/usuarios')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          type="button"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="button"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}