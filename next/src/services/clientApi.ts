import axios from 'axios'

import { ApiRoutes } from '@/lib/api/routes'
import { FormData, Product } from '@/types'

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Server Response Error:', error.response.data)
      return `Ошибка: ${error.response.data.message || error.response.statusText}`
    } else if (error.request) {
      console.error('No Response Error:', error.request)
      return 'Ошибка: Сервер не отвечает'
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    return `Ошибка: ${error.message}`
  } else {
    console.error('Unexpected Error:', error)
    return 'Произошла неизвестная ошибка'
  }
  return 'Произошла неизвестная ошибка'
}

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json; charset=utf8',
  },
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
})

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export const apiClientService = {
  getAllProducts: async (limit: number, page: number, query: string, token: string | null) => {
    return instanceAxios.get(ApiRoutes.products, {
      params: { _limit: limit, _page: page, q: query },
      headers: { Authorization: `Token ${token}` },
    })
  },
  deleteProduct: async (productId: number, token: string | null) => {
    return instanceAxios.delete(`${ApiRoutes.products}/${productId}`, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  updateProduct: async (productId: number, updatedProduct: Product, token: string | null) => {
    return instanceAxios.patch(`${ApiRoutes.products}/${productId}`, updatedProduct, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  getAllManufacturers: async (token: string | null) => {
    return instanceAxios.get(ApiRoutes.manufacturers, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  getMe: async (token: string | null) => {
    return instanceAxios.get(ApiRoutes.me, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  login: async (data: FormData) => {
    return instanceAxios.post(ApiRoutes.login, data)
  },
}
