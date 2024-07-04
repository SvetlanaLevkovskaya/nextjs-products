import { FC } from 'react'

import Image from 'next/image'

import styles from './product-card.module.css'

import { formatCurrency } from '@/lib/utils/formattedCurrency'
import { Manufacturer, Product } from '@/types'

interface ProductCardProps {
  product: Product
  manufacturer: Manufacturer | undefined
  handleEditProduct: (productId: number) => void
  handleDeleteProduct: (productId: number) => void
}

export const ProductCard: FC<ProductCardProps> = ({ product, manufacturer }) => {
  return (
    <div className={styles['product-card']}>
      <div className={styles['product-image-container']}>
        {product.photoUrl && !product.image ? (
          <Image
            src={product.photoUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className={styles['product-image']}
          />
        ) : (
          <div className={styles['no-image']}>Нет фото</div>
        )}
      </div>
      <div className={styles['product-name']}>{product.name}</div>
      <p className={styles['manufacturer-name']}>{manufacturer?.name}</p>
      <div className={styles['product-details']}>
        <p>{product.quantity}</p>
        <p>{formatCurrency(product.price)}</p>
      </div>
    </div>
  )
}
