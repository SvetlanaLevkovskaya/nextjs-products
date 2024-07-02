import { Metadata } from 'next'

import { LoginForm } from '@/components/login/login-form'

export const metadata: Metadata = {
  title: 'Авторизация',
}

export default function Auth() {
  return <LoginForm />
}
