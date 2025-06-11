// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">¡Hola Tailwind en Next.js!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Esta es tu pantalla de inicio usando Tailwind CSS.
      </p>
      <div className="flex space-x-4">
        <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ir al Dashboard
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Iniciar Sesión
        </a>
      </div>
    </main>
  );
}
