import { FC } from 'react'

import Image from 'next/image'

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
    <div
      style={{ border: '1px solid #ccc', padding: '1rem', width: 'calc(25% - 1rem)', height: 334 }}
    >
      <Image src={product.photoUrl} alt={product.name} width="224" height="224" />
      <h3>{product.name}</h3>
      <p>{manufacturer?.name}</p>
      <div className="flex justify-between">
        <p>{product.quantity}</p>
        <p>{formatCurrency(product.price)}</p>
      </div>
    </div>
  )
}
