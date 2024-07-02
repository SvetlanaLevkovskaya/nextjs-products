import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import styles from './modal.module.css'

import { Manufacturer, Product } from '@/types'

interface EditProductModalProps {
  product: Product
  manufacturers: Manufacturer[] | undefined
  onSave: (updatedProduct: Product) => void
  onClose: () => void
}

export const Modal: FC<EditProductModalProps> = ({ product, manufacturers, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product.photoUrl || null)

  useEffect(() => {
    setEditedProduct({ ...product })
    setImagePreview(product.photoUrl || null)
    setSelectedFile(null)
  }, [product])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === 'price' ? parseFloat(value) : name === 'manufacturerId' ? parseInt(value) : value,
    }))
  }

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave({
      ...editedProduct,
      photoUrl: imagePreview ?? '',
    })
  }

  const handleImageClick = () => {
    document.getElementById('photo')?.click()
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview(null)
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Редактирование продукта</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              label="Название"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="number"
              label="Количество"
              id="quantity"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="number"
              label="Цена"
              id="price"
              name="price"
              step="0.01"
              value={editedProduct.price}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="manufacturerId">Производитель</label>
            <select
              id="manufacturerId"
              name="manufacturerId"
              value={editedProduct.manufacturerId}
              onChange={handleChange}
              className="p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none"
              required
            >
              <option value="">Выберите производителя</option>
              {manufacturers?.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <Input
              type="file"
              label="Фото"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview && (
              <div className={styles.imagePreviewContainer}>
                <Image
                  src={imagePreview}
                  alt="Предпросмотр"
                  className={styles.imagePreview}
                  onClick={handleImageClick}
                  width="56"
                  height="56"
                />
                <span className={styles.fileName}>
                  {selectedFile?.name || 'image.png'}
                  <Button variant="remove" onClick={handleRemoveImage}>
                    &#x2716;
                  </Button>
                </span>
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <Button variant="secondary">Отменить</Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
