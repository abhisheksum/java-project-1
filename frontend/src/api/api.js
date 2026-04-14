import axios from 'axios';

// VITE_API_URL must be set in Vercel environment variables at build time.
// Fallback ensures requests don't silently go to "undefined/api".
const API_URL = import.meta.env.VITE_API_URL || 'https://java-project-1-2.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Debug interceptor — logs the full URL being called (visible in browser console)
api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authActions = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const resourceActions = {
  getAll: async () => {
    const response = await api.get('/resources');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/resources', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/resources/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  }
};

export const borrowActions = {
  request: async (payload) => {
    const response = await api.post('/borrow/request', payload);
    return response.data;
  },
  approve: async (id) => {
    const response = await api.put(`/borrow/${id}/approve`);
    return response.data;
  },
  reject: async (id) => {
    const response = await api.put(`/borrow/${id}/reject`);
    return response.data;
  },
  returnResource: async (id) => {
    const response = await api.put(`/borrow/${id}/return`);
    return response.data;
  }
};

export default api;
