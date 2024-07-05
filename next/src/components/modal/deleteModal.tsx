import { FC, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

import { Button } from '@/components/ui/button/button'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'

import styles from './modal.module.css'

import { formatCurrency } from '@/lib/utils/formattedCurrency'
import { Manufacturer, Product } from '@/types'

const ConfirmationModal: FC<{ onConfirm: () => void; onCancel: () => void }> = ({
  onConfirm,
  onCancel,
}) => {
  const modalRef = useClickOutside({ handleClickOutside: onCancel })
  useEscapeKey(onCancel)

  return createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <h2>Подтверждение удаления</h2>
        <p>Вы действительно хотите удалить товар?</p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={onConfirm}>
            Удалить
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

interface DeleteModalProps {
  product: Product
  manufacturer: Manufacturer | undefined
  onDelete: () => void
  onClose: () => void
}

export const DeleteModal: FC<DeleteModalProps> = ({ product, manufacturer, onDelete, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [, setCloseDeleteModal] = useState(false)
  const modalRef = useClickOutside({ handleClickOutside: onClose })
  useEscapeKey(onClose)

  const handleDeleteClick = () => {
    setShowConfirmation(true)
    setCloseDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete()
    setShowConfirmation(false)
    onClose()
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setCloseDeleteModal(false)
  }

  return createPortal(
    <div className={styles.overlay}>
      {!showConfirmation && (
        <div ref={modalRef} className={styles.modal}>
          <div className="flex justify-center items-center">
            <div className={styles.imageContainer}>
              {product.photoUrl && !product.image ? (
                <Image
                  src={product.photoUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className={styles.image}
                />
              ) : (
                <div className={styles.noImage}>Нет фото</div>
              )}
            </div>
          </div>
          <div className={styles.productName}>{product.name}</div>
          <p className={styles.manufacturerName}>Количество: {product.quantity}</p>
          <p className={styles.manufacturerName}>Цена: {formatCurrency(product.price)}</p>
          <p className={styles.manufacturerName}>Производитель: {manufacturer?.name}</p>

          <div className={styles.actions}>
            <Button variant="primary" onClick={handleDeleteClick}>
              Удалить
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Назад
            </Button>
          </div>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>,
    document.getElementById('modal-root')!
  )
}
