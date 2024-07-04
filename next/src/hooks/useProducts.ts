import { useEffect, useState } from 'react'

import axios from 'axios'

import { useDebounce } from '@/hooks/useDebounce'

import { apiClientService } from '@/services/clientApi'

import { useAuth } from '@/providers/auth-provider'
import { Product } from '@/types'

export const useProducts = (limit: number, page: number, searchQuery: string) => {
  const { authToken } = useAuth()
  const debouncedSearchValue = useDebounce(searchQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const totalPages = 13

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClientService.getAllProducts(
          limit,
          page,
          debouncedSearchValue,
          authToken
        )
        setProducts(response.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit, page, debouncedSearchValue])

  return { products, totalPages, loading, error, setProducts }
}
