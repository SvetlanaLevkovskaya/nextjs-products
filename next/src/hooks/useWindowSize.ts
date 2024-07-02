import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

const initialWindowSize: WindowSize = { width: window.innerWidth, height: window.innerHeight }

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(initialWindowSize)

  const updateWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  return windowSize
}
