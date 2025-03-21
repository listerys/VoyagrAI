// A simple API client for making requests to the backend
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Create an axios instance with base URL and default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
      }
    }
    
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  me: () => api.get('/api/auth/me'),
}

export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (data) => api.post('/api/projects', data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`),
}

export const clientsAPI = {
  getAll: () => api.get('/api/clients'),
  getById: (id) => api.get(`/api/clients/${id}`),
  create: (data) => api.post('/api/clients', data),
  update: (id, data) => api.put(`/api/clients/${id}`, data),
  delete: (id) => api.delete(`/api/clients/${id}`),
}

export const requirementsAPI = {
  getByProject: (projectId) => api.get(`/api/projects/${projectId}/requirements`),
  create: (projectId, data) => api.post(`/api/projects/${projectId}/requirements`, data),
  update: (id, data) => api.put(`/api/requirements/${id}`, data),
  delete: (id) => api.delete(`/api/requirements/${id}`),
}

export const simulationsAPI = {
  getAll: () => api.get('/api/simulations'),
  getById: (id) => api.get(`/api/simulations/${id}`),
  create: (data) => api.post('/api/simulations', data),
  update: (id, data) => api.put(`/api/simulations/${id}`, data),
  delete: (id) => api.delete(`/api/simulations/${id}`),
}

export default api
