import { FC } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button/button'
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
              <Button variant="action" onClick={() => handleEditProduct(product.id)}>
                <Edit />
              </Button>
              <Button variant="action" onClick={() => handleDeleteProduct(product.id)}>
                <Delete />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
