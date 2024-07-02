import { useEffect, useState } from 'react'

import axios from 'axios'

import { apiClientService } from '@/services/client-api'

import { useAuth } from '@/providers/auth-provider'

interface Role {
  id: number
  name: string
  pages: string[]
}

interface User {
  id: number
  name: string
  email: string
  password: string
  roles: number[]
}

interface UserData {
  user: User
  roles: Role[]
}

const useFetchUser = () => {
  const { authToken } = useAuth()
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  return { user, error }
}

export default useFetchUser
