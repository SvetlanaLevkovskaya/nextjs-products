import { Metadata } from 'next'

import { NavLayout } from '@/components/layouts/navlayout'

import { Algorithms } from '@/app/algorithms/_components/Algorithms'

export const metadata: Metadata = {
  title: 'Алгоритмы',
}

export default async function AlgorithmsPage() {
  return (
    <NavLayout>
      <Algorithms />
    </NavLayout>
  )
}
