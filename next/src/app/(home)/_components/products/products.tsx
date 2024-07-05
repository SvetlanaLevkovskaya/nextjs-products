'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { DeleteModal } from '@/components/modal/deleteModal'
import { Modal } from '@/components/modal/modal'
import { Spinner } from '@/components/ui/Spinner/Spinner'

import { useManufacturers } from '@/hooks/useManufacturers'
import { useProducts } from '@/hooks/useProducts'
import { useWindowSize } from '@/hooks/useWindowSize'

import { apiClientService } from '@/services/clientApi'

import { Pagination, ProductCard, ProductTable, SearchBar } from '@/app/(home)/_components'
import { calculateLimitPerPage } from '@/lib/utils/calculateLimitPerPage'
import { useAuth } from '@/providers/auth-provider'
import { Manufacturer, NewProduct, Product } from '@/types'

export const Products = () => {
  const { authToken } = useAuth()
  const [limit, setLimit] = useState(8)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<NewProduct | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
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
    setLimit(calculateLimitPerPage(window.innerWidth))
  }, [windowSize.width])

  const handleEditProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) setEditProduct(product as Product)
  }

  const handleDeleteProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setDeleteProduct(product as Product)
    }
  }

  const confirmDeleteProduct = async () => {
    if (deleteProduct) {
      try {
        await apiClientService.deleteProduct(deleteProduct.id, authToken)
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deleteProduct.id)
        )
        setDeleteProduct(null)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleSaveProduct = async (product: Product | NewProduct) => {
    try {
      if ('id' in product && product.id) {
        await apiClientService.updateProduct(product.id, product as Product, authToken)
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? (product as Product) : p))
        )
      } else {
        const createdProduct = await apiClientService.createProduct(
          product as NewProduct,
          authToken
        )
        setProducts((prevProducts) => [createdProduct, ...prevProducts].slice(0, limit))
      }
      setEditProduct(null)
      setNewProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const handleAddProduct = () => {
    setNewProduct({
      name: '',
      quantity: 0,
      price: 0,
      manufacturerId: 0,
      image: '',
    })
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

      {(editProduct || newProduct) && (editProduct || newProduct !== null) && (
        <Modal
          product={editProduct || newProduct!}
          manufacturers={manufacturers}
          onSave={handleSaveProduct}
          onClose={() => {
            setEditProduct(null)
            setNewProduct(null)
          }}
        />
      )}

      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          manufacturer={manufacturers.find((m) => m.id === deleteProduct.manufacturerId)}
          onDelete={confirmDeleteProduct}
          onClose={() => setDeleteProduct(null)}
        />
      )}
    </div>
  )
}
