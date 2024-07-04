'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { apiClientService } from '@/services/clientApi'

import { AppRoutes } from '@/lib/api/routes'
import { useAuth } from '@/providers/auth-provider'
import { UserData } from '@/types'

const useFetchUser = () => {
  const { authToken } = useAuth()
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        try {
          const response = await apiClientService.getMe(authToken)
          setUser(response.data)
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.message)
          }
        }
      }
    }

    fetchUser()
  }, [authToken])

  useEffect(() => {
    if (user && user.roles) {
      const hasAccess = user.roles.some((role) => {
        return role.pages.includes(AppRoutes.algorithms)
      })

      if (!hasAccess) {
        router.push(AppRoutes.products)
      }
    }
  }, [user, router])

  return { user, error }
}

export default useFetchUser
