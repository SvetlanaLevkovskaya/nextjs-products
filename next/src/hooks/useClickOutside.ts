import { useCallback, useEffect, useRef } from 'react'

interface useClickOutsideProps {
  handleClickOutside?: () => void
}

export const useClickOutside = ({ handleClickOutside }: useClickOutsideProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && handleClickOutside) {
        handleClickOutside()
      }
    },
    [handleClickOutside]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClickOutside])
  return ref
}
