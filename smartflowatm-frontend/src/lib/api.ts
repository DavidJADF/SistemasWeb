// src/lib/api.ts
//export interface Usuario { /* igual que antes */ }
//export interface Alerta  { /* igual que antes */ }
//export interface Cajero { /* id, ubicacion, estado, efectivo */ }
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

export interface Alerta {
  id: string;
  atmId: string;
  ubicacion: string;
  efectivoRestante: number;
  fechaPrediccion: string;
  ordenId: string;
  programada: boolean;
}

export interface Cajero {
  id: string;
  ubicacion: string;
  estado: string;
  efectivo: number;
}
export interface DashboardStats {
  totalCajeros: number;
  activos: number;
  inactivos: number;
}
export interface Configuracion {
  clave: string;
  valor: string;
}

// mocks…
const usuariosMock: Usuario[] = [ /* … */ ];
const alertasMock:  Alerta[]  = [ /* … */ ];
const cajerosMock:  Cajero[]  = [ /* … */ ];
const statsMock:   DashboardStats = { totalCajeros: 3, activos: 2, inactivos: 1 };
const configuracionMock: Configuracion[] = [
  { clave: 'intervaloPrediccion', valor: '3 Days' },
  { clave: 'umbralAlerta', valor: '1000' },
  { clave: 'modoSimulacion', valor: 'true' },
];

// Simulan llamadas HTTP:
export async function fetchUsuarios(): Promise<Usuario[]> {
  return new Promise(res => setTimeout(() => res(usuariosMock), 200));
}
export async function createUsuario(u: Omit<Usuario,'id'>): Promise<Usuario> {
  const newUser = { id: `USR-${Date.now()}`, ...u };
  usuariosMock.push(newUser);
  return new Promise(res => setTimeout(() => res(newUser), 200));
}
export async function updateUsuario(updated: Usuario): Promise<Usuario> {
  const i = usuariosMock.findIndex(u=>u.id===updated.id);
  usuariosMock[i] = updated;
  return new Promise(res => setTimeout(() => res(updated), 200));
}
export async function deleteUsuario(id: string): Promise<void> {
  const i = usuariosMock.findIndex(u=>u.id===id);
  usuariosMock.splice(i,1);
  return new Promise(res => setTimeout(() => res(), 200));
}

export async function fetchAlertas(): Promise<Alerta[]> {
  return new Promise(res => setTimeout(() => res(alertasMock), 200));
}
export async function programarDotacion(ids: string[], fecha: string): Promise<string> {
  const ordenId = `ORD-${Date.now()}`;
  alertasMock.forEach(a => {
    if (ids.includes(a.id)) {
      a.programada = true;
      a.ordenId = ordenId;
      a.fechaPrediccion = fecha;
    }
  });
  return new Promise(res => setTimeout(() => res(ordenId), 200));
}

export async function fetchCajeros(): Promise<Cajero[]> {
  return new Promise(res => setTimeout(() => res(cajerosMock), 200));
}
export async function fetchDashboardStats(): Promise<DashboardStats> {
  return new Promise(res => setTimeout(() => res(statsMock), 200));
}

export async function fetchConfiguracion(): Promise<Configuracion[]> {
  return new Promise(res => setTimeout(() => res(configuracionMock), 200));
}

export async function updateConfiguracion(data: Configuracion[]): Promise<void> {
  // En un backend real harías POST/PUT a tu API.
  // Aquí actualizamos el array mock en memoria:
  configuracionMock.length = 0;
  configuracionMock.push(...data);
  return new Promise(res => setTimeout(() => res(), 200));
}
