import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
};

// Leads endpoints
export const leadsAPI = {
  getLeads: (filters = {}) => api.get('/api/leads', { params: filters }),
  getLeadById: (id) => api.get(`/api/leads/${id}`),
  createLead: (data) => api.post('/api/leads', data),
  updateLead: (id, data) => api.put(`/api/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/api/leads/${id}`),
};

// Notes endpoints
export const notesAPI = {
  getNotesByLeadId: (leadId) => api.get(`/api/notes/lead/${leadId}`),
  createNote: (leadId, data) => api.post(`/api/notes/lead/${leadId}`, data),
  deleteNote: (noteId) => api.delete(`/api/notes/${noteId}`),
};

// Dashboard endpoints
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats'),
};

export default api;
