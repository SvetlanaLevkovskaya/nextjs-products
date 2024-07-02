import { FC } from 'react'

import Image from 'next/image'

import { Delete, Edit } from '@/components/ui/icons'

import styles from './product-table.module.css'

import { formatCurrency } from '@/lib/utils/formattedCurrency'
import { Manufacturer, Product } from '@/types'

interface ProductTableProps {
  products: Product[]
  manufacturers: Manufacturer[] | null
  handleEditProduct: (productId: number) => void
  handleDeleteProduct: (productId: number) => void
}

export const ProductTable: FC<ProductTableProps> = ({
  products,
  manufacturers,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th className={styles.quantityColumn}>Количество</th>
          <th>Производитель</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id}>
            <td className={styles.imageContainer}>
              {product.photoUrl ? (
                <Image
                  src={product.photoUrl}
                  alt={product.name}
                  width="56"
                  height="56"
                  className={styles.productImage}
                  onError={(e) => (e.currentTarget.src = '/placeholder-image.png')}
                />
              ) : (
                <div className={styles.noImageText}>Нет фото</div>
              )}
            </td>
            <td className={styles.truncate}>{product.name}</td>
            <td className={styles.quantityCell}>{product.quantity}</td>
            <td className={styles.truncate}>
              {manufacturers?.find((m) => m.id === product.manufacturerId)?.name}
            </td>
            <td>{formatCurrency(product.price)}</td>
            <td>
              <button onClick={() => handleEditProduct(product.id)} className={styles.actionButton}>
                <Edit />
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className={styles.actionButton}
              >
                <Delete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
