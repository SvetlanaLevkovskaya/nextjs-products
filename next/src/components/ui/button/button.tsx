import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'remove' | 'action' | 'pagination'
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  let baseStyles = 'rounded-md font-medium text-base transition duration-200'

  let variantStyles
  switch (variant) {
    case 'primary':
      variantStyles = 'px-6 py-2 bg-slate-300 hover:bg-slate-400'
      break
    case 'secondary':
      variantStyles = 'px-6 py-2 bg-slate-700 text-white hover:bg-slate-600'
      break
    case 'remove':
      variantStyles = 'px-1.5 py-1 bg-none border-none text-base cursor-pointer'
      break
    case 'action':
      variantStyles = 'px-1.5 py-1 rounded-md bg-transparent hover:bg-gray-200'
      break
    case 'pagination':
      variantStyles =
        'px-1 py-0 rounded-none cursor-pointer transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
      break
    default:
      variantStyles = ''
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}
