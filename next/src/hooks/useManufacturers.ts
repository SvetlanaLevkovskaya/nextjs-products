import { useEffect, useState } from 'react'

import axios from 'axios'

import { apiClientService } from '@/services/clientApi'

import { useAuth } from '@/providers/auth-provider'
import { Manufacturer } from '@/types'

export const useManufacturers = () => {
  const { authToken } = useAuth()
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchManufacturers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClientService.getAllManufacturers(authToken)
        setManufacturers(response.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchManufacturers()
  }, [])

  return { manufacturers, loading, error }
}
