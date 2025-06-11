// src/app/configuracion/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchConfiguracion, updateConfiguracion, Configuracion } from '@/lib/api';

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<Configuracion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Cargar configuración desde el API mock
  useEffect(() => {
    fetchConfiguracion()
      .then(data => setConfig(data))
      .finally(() => setLoading(false));
  }, []);

  // Manejar cambios en un campo
  const handleChange = (clave: string, valor: string) => {
    setConfig(prev =>
      prev.map(c => (c.clave === clave ? { ...c, valor } : c))
    );
  };

  // Guardar al API mock
  const handleSave = async () => {
    setSaving(true);
    await updateConfiguracion(config);
    setSaving(false);
    alert('Configuración guardada');
  };

  if (loading) {
    return <p className="p-8 text-center">Cargando configuración…</p>;
  }

  // Obtener valores por clave
  const getVal = (clave: string) =>
    config.find(c => c.clave === clave)?.valor || '';

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-2xl shadow p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
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
          value={getVal('umbralAlerta')}
          onChange={e => handleChange('umbralAlerta', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Language and Time Zone */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-1">Language and Time Zone</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Language</label>
            <select
              value={getVal('language')}
              onChange={e => handleChange('language', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time Zone</label>
            <select
              value={getVal('timeZone')}
              onChange={e => handleChange('timeZone', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
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
          {['Email', 'SMS'].map(type => (
            <label key={type} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={getVal(type) === 'true'}
                onChange={e => handleChange(type, e.target.checked.toString())}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
