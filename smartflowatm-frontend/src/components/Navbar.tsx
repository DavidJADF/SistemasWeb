// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Ocultar Navbar en la página de login
  if (pathname === '/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">SmartFlowATM</div>
      <ul className="flex space-x-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/cajeros">Cajeros</Link></li>
        <li><Link href="/alertas">Alertas</Link></li>
        <li><Link href="/usuarios">Usuarios</Link></li>
		<li><Link href="/configuracion">Configuracion</Link></li>
        <li>
          <button onClick={handleLogout} className="ml-4 text-red-600 hover:text-red-800">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}