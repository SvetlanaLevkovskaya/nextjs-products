import { FC } from 'react'
import { createPortal } from 'react-dom'

import { FormFields } from '@/components/modal/_components/formFields/formFields'
import { ImagePreview } from '@/components/modal/_components/imagePreview/imagePreview'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useImagePreview } from '@/hooks/useImagePreview'
import { useModalFormInitialization } from '@/hooks/useModalFormInitialization'

import styles from './modal.module.css'

import { Manufacturer, NewProduct, Product } from '@/types'

interface EditProductModalProps {
  product: Product | NewProduct
  manufacturers: Manufacturer[]
  onSave: (product: Product | NewProduct) => void
  onClose: () => void
}

export const Modal: FC<EditProductModalProps> = ({ product, manufacturers, onSave, onClose }) => {
  const { register, handleSubmit, control, onSubmit } = useModalFormInitialization(product, onSave)
  const { selectedFile, imagePreview, handleFileChange, handleRemoveImage } =
    useImagePreview(product)
  const modalRef = useClickOutside({ handleClickOutside: onClose })
  useEscapeKey(onClose)

  const handleImageClick = () => {
    document.getElementById('photo')?.click()
  }

  return createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <h2>{product?.id ? 'Редактирование продукта' : 'Создание товара'}</h2>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data, imagePreview))}
          className={styles.form}
        >
          <FormFields
            register={register}
            control={control}
            manufacturers={manufacturers}
            product={product}
          />
          <div className={styles.formGroup}>
            <Input
              type="file"
              label="Фото"
              id="photo"
              onChange={handleFileChange}
              className="hidden"
            />
            <ImagePreview
              imagePreview={imagePreview}
              selectedFile={selectedFile}
              handleImageClick={handleImageClick}
              handleRemoveImage={handleRemoveImage}
            />
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
