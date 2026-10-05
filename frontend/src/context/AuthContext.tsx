import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api } from '@/lib/api'

export type AuthUser = {
  id: number
  name: string
  role: string
  isAdmin: boolean
}

export const GERANT_HOME = '/admin/configuration/habillage'

export const isGerant = (user: AuthUser | null) => user?.role === 'gerant'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (login: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api<{ user: AuthUser }>('/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (loginValue: string, password: string) => {
    const data = await api<{ user: AuthUser }>('/login', {
      method: 'POST',
      body: { login: loginValue.trim(), password },
    })
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api('/logout', { method: 'POST' })
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, isLoading, login, logout }),
    [user, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

/** The gérant only reads Arabic: admin screens he can reach switch to Arabic for him. */
export function useAdminLang() {
  const { user } = useAuth()
  const ar = isGerant(user)
  const t = useCallback((fr: string, arText: string) => (ar ? arText : fr), [ar])
  return { ar, t }
}
