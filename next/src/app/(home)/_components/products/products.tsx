'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { Modal } from '@/components/modal/modal'
import { Spinner } from '@/components/ui/Spinner/Spinner'

import { useDataFetch } from '@/hooks/useDataFetch'
import { useDebounce } from '@/hooks/useDebounce'
import { useManufacturers } from '@/hooks/useManufacturers'
import { useProducts } from '@/hooks/useProducts'
import { useWindowSize } from '@/hooks/useWindowSize'

import { apiClientService } from '@/services/client-api'

import { Pagination, ProductCard, ProductTable, SearchBar } from '@/app/(home)/_components'
import { calculateLimitPerPage } from '@/lib/utils/calculateLimitPerPage'
import { useAuth } from '@/providers/auth-provider'
import { Manufacturer, Product } from '@/types'

export const Products = () => {
  /*  const { authToken } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [limit, setLimit] = useState(8)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchValue = useDebounce(searchQuery)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const windowSize = useWindowSize()
  const totalPages = 13

  const {
    data: manufacturers,
    loading: loadingManufacturers,
    error: manufacturersError,
  } = useDataFetch<Manufacturer[]>(() => apiClientService.getAllManufacturers(authToken), [])
  const {
    data: fetchedProducts,
    loading: loadingProducts,
    error: productsError,
  } = useDataFetch<Product[]>(
    () => apiClientService.getAllProducts(limit, page, debouncedSearchValue, authToken),
    [limit, page, debouncedSearchValue]
  )*/

  const { authToken } = useAuth()
  const [limit, setLimit] = useState(8)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const windowSize = useWindowSize()

  const {
    products,
    totalPages,
    loading: loadingProducts,
    error: productsError,
    setProducts,
  } = useProducts(limit, page, searchQuery)
  const {
    manufacturers,
    loading: loadingManufacturers,
    error: manufacturersError,
  } = useManufacturers()
  useEffect(() => {
    setLimit(calculateLimitPerPage(windowSize.width))
  }, [windowSize.width])

  const handleEditProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) setEditProduct(product)
  }

  const handleDeleteProduct = async (productId: number) => {
    try {
      await apiClientService.deleteProduct(productId, authToken)
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      await apiClientService.updateProduct(updatedProduct.id, updatedProduct, authToken)
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      )
      setEditProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const handleAddProduct = () => console.log('Добавление нового продукта')

  const handleSwitchView = (view: 'table' | 'cards') => setViewMode(view)

  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1))

  const handleNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, totalPages))

  const error = productsError || manufacturersError

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSwitchView={handleSwitchView}
        handleAddProduct={handleAddProduct}
        viewMode={viewMode}
      />
      {error && <p>{error}</p>}
      {viewMode === 'table' ? (
        loadingProducts || loadingManufacturers ? (
          <Spinner />
        ) : (
          <ProductTable
            products={products}
            manufacturers={manufacturers || []}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        )
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {loadingProducts || loadingManufacturers ? (
            <Spinner />
          ) : (
            products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                manufacturer={manufacturers?.find(
                  (m: Manufacturer) => m.id === product.manufacturerId
                )}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))
          )}
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={(pageNumber: number) => setPage(pageNumber)}
      />

      {editProduct && (
        <Modal
          product={editProduct}
          manufacturers={manufacturers}
          onSave={handleSaveProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  )
}
