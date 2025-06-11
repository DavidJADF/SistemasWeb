// src/app/configuracion-mock/page.tsx
'use client';

export default function ConfiguracionMockPage() {
  /*const mock = [
    { clave: 'intervaloPrediccion', valor: '3 Days' },
    { clave: 'umbralAlerta',      valor: '1000'  },
    { clave: 'modoSimulacion',    valor: 'true'  },
  ];*/

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-2xl shadow p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        {/* Placeholder icon */}
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold">⚙️</span>
        </div>
        <span className="ml-2 text-xl font-bold">CASH PREDICT</span>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Alert Thresholds */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-1">Alert Thresholds</h3>
        <label className="block text-sm text-gray-600 mb-2">Low cash level alert</label>
        <input
          type="number"
          defaultValue={20}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Language and Time Zone */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-1">Language and Time Zone</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Language</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time Zone</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>UTC</option>
              <option>GMT-5</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-1">Notifications</h3>
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-blue-600" />
            <span className="ml-2 text-gray-700">Email</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span className="ml-2 text-gray-700">SMS</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
}
