import { createContext, useState, useContext, useEffect } from 'react'
import api from '@/services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (err) {
        console.error('Error parsing stored user:', err)
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Login function - calls backend
  const login = async (email, password, role) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role,
      }, {
        withCredentials: true,
      })

      const userData = {
        id: response.data.id || email,
        email: response.data.email || email,
        name: response.data.name || email.split('@')[0],
        role: response.data.role || role,
        token: response.data.token || null,
        clubId: response.data.clubId || null,
      }

      setUser(userData)
      setAdminData(response.data)
      localStorage.setItem('user', JSON.stringify(userData))
      return userData
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch admin/user details from backend
  const fetchAdminDetails = async (token) => {
    try {
      const response = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAdminData(response.data)
      return response.data
    } catch (err) {
      console.error('Error fetching admin details:', err)
      throw err
    }
  }

  // Fetch club data for club admin
  const fetchClubData = async (clubId, token) => {
    try {
      const response = await api.get(`/clubs/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (err) {
      console.error('Error fetching club data:', err)
      throw err
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout', {}, {
        withCredentials: true,
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      setAdminData(null)
      localStorage.removeItem('user')
    }
  }

  // Update admin profile
  const updateProfile = async (updates) => {
    try {
      const response = await api.put('/auth/profile', updates, {
        withCredentials: true,
      })
      setAdminData(response.data)
      setUser(prev => ({ ...prev, name: response.data.name }))
      localStorage.setItem('user', JSON.stringify(user))
      return response.data
    } catch (err) {
      console.error('Error updating profile:', err)
      throw err
    }
  }

  const value = {
    user,
    adminData,
    loading,
    error,
    login,
    logout,
    fetchAdminDetails,
    fetchClubData,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'super_admin',
    isClubAdmin: user?.role === 'club_admin',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
