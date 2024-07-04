import { ChangeEvent, FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'

import Image from 'next/image'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import { useClickOutside } from '@/hooks/useClickOutside'

import styles from './modal.module.css'

import { Manufacturer, NewProduct, Product } from '@/types'

interface EditProductModalProps {
  product: Product | NewProduct
  manufacturers: Manufacturer[]
  onSave: (product: Product | NewProduct) => void
  onClose: () => void
}

export const Modal: FC<EditProductModalProps> = ({ product, manufacturers, onSave, onClose }) => {
  const { register, handleSubmit, control, setValue } = useForm<Product | NewProduct>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    setValue('name', product.name)
    setValue('quantity', product.quantity)
    setValue('price', product.price)
    setValue('manufacturerId', product.manufacturerId)
    if ('photoUrl' in product) {
      setImagePreview(product.photoUrl || product.image || null)
    }
    setSelectedFile(null)
  }, [product, setValue])

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

  const onSubmit = (data: Product | NewProduct) => {
    const productToSave = {
      ...data,
      ...(data.id ? { photoUrl: imagePreview ?? '' } : { image: imagePreview ?? '' }),
    }
    onSave(productToSave)
  }

  const handleImageClick = () => {
    document.getElementById('photo')?.click()
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview(null)
  }

  const modalRef = useClickOutside({
    handleClickOutside: onClose,
  })

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (product && e.key === 'Escape') {
        onClose()
      }
    }

    document.body.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKey)
    }
  }, [product])

  return createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <h2>{product?.id ? 'Редактирование продукта' : 'Создание товара'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              label="Название"
              id="name"
              register={register('name', { required: true })}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="number"
              label="Количество"
              id="quantity"
              register={register('quantity', { required: true })}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="number"
              label="Цена"
              id="price"
              step="0.01"
              register={register('price', { required: true })}
              className="w-full"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="manufacturerId">Производитель</label>
            <Controller
              name="manufacturerId"
              control={control}
              defaultValue={product.manufacturerId}
              render={({ field }) => (
                <select
                  id="manufacturerId"
                  {...field}
                  className="p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none"
                  required
                >
                  <option value="">Выберите производителя</option>
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="file"
              label="Фото"
              id="photo"
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
            <Button variant="secondary" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
