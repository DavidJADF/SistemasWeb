// src/app/layout.tsx
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata = {
  title: 'SmartFlowATM',
  description: 'Predicción de efectivo en cajeros automáticos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col h-full bg-gray-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        {/* Puedes añadir aquí un <Footer /> */}
      </body>
    </html>
  );
}
