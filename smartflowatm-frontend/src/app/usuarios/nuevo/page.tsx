// src/app/usuarios/nuevo/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NuevoUsuarioPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Operador');

  const handleSubmit = () => {
    // Aquí mandarías al backend; por ahora solo mock:
    console.log('Nuevo usuario:', { nombre, email, rol });
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
          <option>Admin</option>
          <option>Operador</option>
        </select>
      </label>
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        type="button"
      >
        Crear Usuario
      </button>
    </div>
  );
}