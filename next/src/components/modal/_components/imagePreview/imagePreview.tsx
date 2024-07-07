import { FC } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button/button'

import styles from './imagePreview.module.css'

interface ImagePreviewProps {
  imagePreview: string | null
  selectedFile: File | null
  handleImageClick: () => void
  handleRemoveImage: () => void
}

export const ImagePreview: FC<ImagePreviewProps> = ({
  imagePreview,
  selectedFile,
  handleImageClick,
  handleRemoveImage,
}) => {
  return (
    <>
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
    </>
  )
}
