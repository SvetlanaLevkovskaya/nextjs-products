import { Metadata } from 'next'

import { NavLayout } from '@/components/layouts/navlayout'

import { apiClientService } from '@/services/client-api'

import { Products } from '@/app/(home)/_components/products/products'

export const metadata: Metadata = {
  title: 'Продукты',
}

export default async function MainPage() {
  return (
    <NavLayout>
      <Products />
    </NavLayout>
  )
}
