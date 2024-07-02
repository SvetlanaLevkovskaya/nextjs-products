import { useEffect, useState } from 'react'

import axios from 'axios'

export const useDataFetch = <T>(fetchFunction: Function, dependencies: any[] = []) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFunction()
        setData(response.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}
