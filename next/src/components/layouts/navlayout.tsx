'use client'

import { type FC, type PropsWithChildren } from 'react'

import { Sidebar } from '@/components/layouts/components/sidebar'

export const NavLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-screen-lg">{children}</div>
      </main>
    </div>
  )
}
