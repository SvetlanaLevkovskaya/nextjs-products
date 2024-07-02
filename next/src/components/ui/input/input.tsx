import { ChangeEventHandler, FC, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: UseFormRegisterReturn<any>
  onChange?: ChangeEventHandler<HTMLInputElement>
  error?: string | boolean
}

export const Input: FC<CustomInputProps> = ({
  label,
  register,
  onChange: onChangeInput,
  error,
  ...props
}) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          {...register}
          onChange={(e) => {
            onChangeInput?.(e)
            register?.onChange?.(e)
          }}
          {...props}
          className={`p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none ${props.className}`}
        />
      </div>
      {typeof error === 'string' && !!error.length && (
        <div className="p-text text-rose-700">{error}</div>
      )}
    </>
  )
}
