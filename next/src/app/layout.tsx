import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { AuthProvider } from '@/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'test-task',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-slate-100`}>
        <ToastContainer limit={1} />
        <AuthProvider>{children}</AuthProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
