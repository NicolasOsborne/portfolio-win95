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
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { Content, Locale } from '@/types/contentType'
import { User } from '@/types/userType'

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  content: Content
  locale: Locale
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
  serverContent: Content
  initialLocale: Locale
  initialSlug?: string
}

const TOKEN_KEY = 'jwt_token'

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  serverContent,
  initialLocale,
  initialSlug,
}) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)
  const locale = initialLocale

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

  useEffect(() => {
    if (!isReady) return

    const protectedSlugs = ['desktop']
    const loginSlugs = ['login']

    if (!initialSlug) {
      router.replace(`/${locale}/${user ? 'desktop' : 'login'}`)
      return
    }

    if (!user && protectedSlugs.includes(initialSlug)) {
      router.replace(`/${locale}/login`)
    }

    if (user && loginSlugs.includes(initialSlug)) {
      router.replace(`/${locale}/desktop`)
    }
  }, [user, initialSlug, locale, router, isReady])

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        const res = await fetch('/api/auth/login', {
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
          router.replace(`/${locale}/desktop`)
          return true
        }
        return false
      } catch (err) {
        console.error('Login failed', err)
        return false
      }
    },
    [router, locale]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    router.replace(`/${locale}/login`)
  }, [router, locale])

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      content: serverContent,
      locale,
      login,
      logout,
    }),
    [user, locale, serverContent, login, logout]
  )

  if (!isReady) return null

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
