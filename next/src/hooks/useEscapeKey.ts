import { useEffect } from 'react'

export const useEscapeKey = (onClose: () => void) => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])
}
