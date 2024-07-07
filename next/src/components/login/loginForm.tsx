'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'

import { customToastSuccess } from '@/components/ui/CustomToast/CustomToast'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import { apiClientService } from '@/services/clientApi'

import styles from './loginForm.module.css'

import { AppRoutes } from '@/lib/api/routes'
import { validationSchema } from '@/lib/utils/validationSchema'
import { useAuth } from '@/providers/auth-provider'
import { FormData } from '@/types'

export const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) })
  const [authError, setAuthError] = useState('')
  const { login } = useAuth()

  const email = watch('email')
  const password = watch('password')

  useEffect(() => {
    if (authError) {
      setAuthError('')
    }
  }, [email, password])

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      const response = await apiClientService.login({ email, password })
      const { token } = response.data
      login(token)
      router.push(AppRoutes.products)
      customToastSuccess(`Пользователь ${email} залогинен`)
    } catch (error) {
      setAuthError('Ошибка авторизации. Проверьте почту и пароль.')
    }
  }

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.bgLayer}>
          <div className={styles.bgTop} />
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className="text-center">Авторизация</h2>
            <div className={styles.inputGroup}>
              <div className={styles.formGroup}>
                <h6>Почта</h6>
                <Input
                  register={register('email', { required: true })}
                  placeholder="Почта"
                  type="email"
                  error={errors.email?.message}
                  className="w-full"
                />
              </div>
              <div className={styles.formGroup}>
                <h6>Пароль</h6>
                <Input
                  register={register('password', { required: true })}
                  placeholder="Пароль"
                  type="password"
                  error={errors.password?.message}
                  className="w-full"
                />
              </div>
            </div>
            {authError && <div className={styles.authError}>{authError}</div>}
            <div className={styles.centeredButton}>
              <Button type="submit">Войти</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
