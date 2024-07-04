import { FC } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/ui/input/input'

import styles from './formFields.module.css'

import { Manufacturer, NewProduct, Product } from '@/types'

interface FormFieldsProps {
  register: any
  control: any
  manufacturers: Manufacturer[]
  product: Product | NewProduct
}

export const FormFields: FC<FormFieldsProps> = ({ register, control, manufacturers, product }) => (
  <>
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
  </>
)
