import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user', error)
      }
    }
    setLoading(false)
  }, [])
  
  const login = async (email, password) => {
    setLoading(true)
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful login with mock data
      if (email === 'demo@example.com' && password === 'password') {
        const userData = {
          id: '1',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User',
          role: 'Project Manager'
        }
        
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        toast.success('Login successful')
        return userData
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
  }
  
  const register = async (userData) => {
    setLoading(true)
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just simulate a successful registration
      const newUser = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'Project Manager'
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      toast.success('Registration successful')
      return newUser
    } catch (error) {
      toast.error('Registration failed: ' + error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
