import axios from 'axios';

// Create an Axios instance
// Connects directly to backend as requested
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

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
