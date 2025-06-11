// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const MOCK_EMAIL = 'admin@smartflowatm.com';
    const MOCK_PASS  = 'Password123!';

    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      localStorage.setItem('authToken', 'MOCK_TOKEN_ABC123');
      router.replace('/dashboard');
    } else {
      alert('Credenciales incorrectas. Prueba:\nadmin@smartflowatm.com / Password123!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email" required
            value={email} onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Contraseña</span>
          <input
            type="password" required
            value={password} onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Validando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
