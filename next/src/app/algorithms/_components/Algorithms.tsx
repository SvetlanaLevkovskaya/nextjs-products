'use client'

import { FC, useState } from 'react'

import { Button } from '@/components/ui/button/button'

import { apiClientService } from '@/services/clientApi'

import { useAuth } from '@/providers/auth-provider'

interface Breadcrumb {
  id: number
  parent: number
  advertisement_count: number
  has_child_cache: boolean
  name_en_us: string
  name_ru: string
  name_src: string
}

export const Algorithms = () => {
  const { authToken } = useAuth()
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])

  const handleClick = async () => {
    try {
      const response = await apiClientService.getRandomBreadcrumbs(authToken)
      const randomBreadcrumb = response.data[Math.floor(Math.random() * response.data.length)]
      const newBreadcrumb = randomBreadcrumb.name_ru
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, newBreadcrumb])
    } catch (error) {
      console.error('Error fetching breadcrumbs:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col w-1/5 mb-4">
        <Button onClick={handleClick}>Получить новую конечную точку</Button>
      </div>
      <h4>{breadcrumbs.join(' > ')}</h4>
    </>
  )
}
