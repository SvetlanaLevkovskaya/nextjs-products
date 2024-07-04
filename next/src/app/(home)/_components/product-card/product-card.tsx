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
    <div className="p-4 w-full h-78 flex flex-col">
      <div className="relative w-[224px] h-[224px] mb-2 bg-white rounded-[10px] flex items-center justify-center">
        {product.photoUrl && !product.image ? (
          <Image
            src={product.photoUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        ) : (
          <div className="text-2xl text-gray-500 text-center">Нет фото</div>
        )}
      </div>
      <div className=" text-center mb-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
        {product.name}
      </div>
      <p className="text-sm text-center text-gray-500 mb-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
        {manufacturer?.name}
      </p>
      <div className="flex justify-between mt-auto">
        <p>{product.quantity}</p>
        <p>{formatCurrency(product.price)}</p>
      </div>
    </div>
  )
}
