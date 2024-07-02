import { useEffect, useState } from 'react'

import axios from 'axios'

import { apiClientService } from '@/services/clientApi'

import { useAuth } from '@/providers/auth-provider'
import { UserData } from '@/types'

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
