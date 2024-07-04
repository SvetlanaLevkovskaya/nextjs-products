import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { NewProduct, Product } from '@/types'

export const useModalFormInitialization = (
  product: Product | NewProduct,
  onSave: (product: Product | NewProduct) => void
) => {
  const { register, handleSubmit, control, setValue } = useForm<Product | NewProduct>()

  useEffect(() => {
    setValue('name', product.name)
    setValue('quantity', product.quantity)
    setValue('price', product.price)
    setValue('manufacturerId', product.manufacturerId)
  }, [product, setValue])

  const onSubmit = (formData: Product | NewProduct, imagePreview: string | null) => {
    const updatedProduct = {
      ...product,
      ...formData,
      ...(formData.id && { photoUrl: imagePreview ?? '' }),
    }

    onSave(updatedProduct)
  }

  return { register, handleSubmit, control, onSubmit }
}
