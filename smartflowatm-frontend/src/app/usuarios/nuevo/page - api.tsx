// =================================
// src/app/usuarios/nuevo/page.tsx
// =================================

'use client';

import { useRouter } from 'next/navigation';
import { createUsuario } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function NuevoUsuarioPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Operador');

  const handleSubmit = async () => {
    await createUsuario({ nombre, email, rol, activo: true });
    router.push('/usuarios');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Añadir Usuario</h1>

      <label className="block mb-3">
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-3">
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-3">
        Rol
        <select
          value={rol}
          onChange={e => setRol(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="Admin">Admin</option>
          <option value="Operador">Operador</option>
        </select>
      </label>

      <div className="flex justify-between">
        <Link href="/usuarios">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancelar
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          type="button"
        >
          Crear Usuario
        </button>
      </div>
    </div>
  );
}