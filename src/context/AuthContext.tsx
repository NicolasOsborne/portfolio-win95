'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  FC,
  ReactNode,
} from 'react'
import jwt from 'jsonwebtoken'
import { User } from '@/types/userType'

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const TOKEN_KEY = 'jwt_token'

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      try {
        const decoded = jwt.decode(token) as jwt.JwtPayload | null
        if (decoded?.username && decoded?.sub) {
          setUser({
            id: decoded.sub,
            username: decoded.username,
          })
        } else {
          localStorage.removeItem(TOKEN_KEY)
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setIsReady(true)
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok && data.success && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token)
        const decoded = jwt.decode(data.token) as jwt.JwtPayload | null
        if (decoded?.username && decoded?.sub) {
          setUser({
            id: decoded.sub,
            username: decoded.username,
          })
        }
        return true
      }
      return false
    } catch (err) {
      console.error('Login failed', err)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
    }),
    [user, login, logout]
  )

  if (!isReady) return null

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
