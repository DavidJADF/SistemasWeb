// src/services/api.ts
import axios from 'axios';

// Usamos NEXT_PUBLIC_API_URL para que la URL esté disponible en el cliente
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
