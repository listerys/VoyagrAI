// Authentication utilities
import { authAPI } from './api'

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}

export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        return JSON.parse(user)
      } catch (error) {
        console.error('Failed to parse user from localStorage', error)
      }
    }
  }
  return null
}

export const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password })
    const { token, user } = response.data
    
    setToken(token)
    setUser(user)
    
    return user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await authAPI.register(userData)
    const { token, user } = response.data
    
    setToken(token)
    setUser(user)
    
    return user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export const logoutUser = () => {
  removeToken()
  removeUser()
}

export const getCurrentUser = async () => {
  try {
    const response = await authAPI.me()
    const { user } = response.data
    
    setUser(user)
    
    return user
  } catch (error) {
    removeToken()
    removeUser()
    throw new Error(error.response?.data?.message || 'Failed to get user')
  }
}

export const isAuthenticated = () => {
  return !!getToken()
}
