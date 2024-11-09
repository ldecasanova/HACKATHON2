// src/services/axiosInstance.ts

import axios from 'axios';

const API_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Agrega un interceptor de solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtiene el token del almacenamiento local o del contexto
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Si hay un token y la URL requiere autenticación, agrega el encabezado
    if (user && user.token && config.headers && requiresAuth(config.url)) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para determinar si una URL requiere autenticación
function requiresAuth(url?: string) {
  // Lista de rutas que requieren autenticación
  const authRequiredRoutes = ['/item', '/cart'];

  return authRequiredRoutes.some((route) => url?.startsWith(route));
}

export default axiosInstance;
