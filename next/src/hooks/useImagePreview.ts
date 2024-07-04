import { ChangeEvent, useEffect, useState } from 'react'

import { NewProduct, Product } from '@/types'

export const useImagePreview = (product: Product | NewProduct) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if ('photoUrl' in product) {
      setImagePreview(product.photoUrl || null)
    } else {
      setImagePreview(product.image || null)
    }
    setSelectedFile(null)
  }, [product])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview(null)
  }

  return { selectedFile, imagePreview, handleFileChange, handleRemoveImage }
}
