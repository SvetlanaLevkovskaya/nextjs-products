import { Metadata } from 'next'

import { LoginForm } from '@/components/login/loginForm'

export const metadata: Metadata = {
  title: 'Авторизация',
}

export default function Auth() {
  return <LoginForm />
}
