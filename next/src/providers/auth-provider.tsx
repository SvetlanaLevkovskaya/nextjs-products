'use client'

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { customToastError } from '@/components/ui/CustomToast/CustomToast'

import { AppRoutes } from '@/lib/api/routes'

interface AuthContextType {
  authToken: string | null
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('authToken')
      if (token) {
        setAuthToken(token)
      } else {
        router.push(AppRoutes.login)
      }
      setIsLoading(false)
    }
    initializeAuth()
  }, [router])

  const login = useCallback((token: string) => {
    Cookies.set('authToken', token)
    setAuthToken(token)
  }, [])

  const logout = useCallback(() => {
    try {
      Cookies.remove('authToken')
      setAuthToken(null)
      router.push(AppRoutes.login)
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error)
      customToastError('Ошибка при выходе из системы. Попробуйте еще раз.')
    }
  }, [router])

  const contextValue = useMemo(
    () => ({
      authToken,
      login,
      logout,
      isLoading,
    }),
    [authToken, login, logout, isLoading]
  )

  if (isLoading) {
    return null
  }

  return <AuthContext.Provider value={contextValue}>{!isLoading && children}</AuthContext.Provider>
}
