import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { API_ENDPOINTS } from '../config/api'

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterCredentials {
  phone: string
  password: string
  nickname: string
}

interface User {
  id: string
  phone: string
  nickname: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 监听storage事件，实现跨标签页同步
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue))
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || '登录失败')
      }

      const data = await response.json()
      const userData = data.user

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.access_token)

      message.success('登录成功')
      navigate('/')
    } catch (error) {
      message.error(error instanceof Error ? error.message : '登录失败，请检查用户名和密码')
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || '注册失败')
      }

      const data = await response.json()
      const userData = data.user

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.access_token)

      message.success('注册成功')
      navigate('/')
    } catch (error) {
      message.error(error instanceof Error ? error.message : '注册失败，请稍后重试')
      console.error('Register error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    message.info('已退出登录')
    navigate('/login')
  }, [navigate])

  const refreshUser = useCallback(() => {
    const storedUser = localStorage.getItem('user')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
