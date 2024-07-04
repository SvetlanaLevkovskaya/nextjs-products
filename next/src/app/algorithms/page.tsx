import { Metadata } from 'next'

import { NavLayout } from '@/components/layouts/navlayout'

import { Products } from '@/app/(home)/_components/products/products'
import { Algorithms } from '@/app/algorithms/_components/Algorithms'

export const metadata: Metadata = {
  title: 'algorithms',
}

export default async function AlgorithmsPage() {
  return (
    <NavLayout>
      <Algorithms />
    </NavLayout>
  )
}
