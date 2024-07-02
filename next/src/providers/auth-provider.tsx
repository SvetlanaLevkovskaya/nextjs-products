'use client'

import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

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
    const token = Cookies.get('authToken')
    if (token) {
      setAuthToken(token)
    } else {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  const login = (token: string) => {
    Cookies.set('authToken', token)
    setAuthToken(token)
  }

  const logout = () => {
    Cookies.remove('authToken')
    setAuthToken(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
