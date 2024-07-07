'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { customToastError, customToastSuccess } from '@/components/ui/CustomToast/CustomToast'
import { Spinner } from '@/components/ui/Spinner/Spinner'
import { Button } from '@/components/ui/button/button'

import useFetchUser from '@/hooks/useFetchUser'

import styles from './sidebar.module.css'

import { ArrowLeft, ArrowLeftHidden, Logo, Logout } from '../../ui/icons'

import { AppRoutes } from '@/lib/api/routes'
import { getRoleName } from '@/lib/utils/getRoleName'
import { useAuth } from '@/providers/auth-provider'

export const Sidebar = () => {
  const { logout } = useAuth()
  const { user, error } = useFetchUser()

  const router = useRouter()

  if (error) {
    return <p>Произошла ошибка: {error}</p>
  }

  const handleLogout = async (user: string) => {
    logout()
    customToastSuccess(`Пользователь ${user} вышел из системы`)
  }

  return (
    <div className={styles.sidebarContainer}>
      <button onClick={() => router.push(AppRoutes.products)}>
        <h1 className={styles.sidebarHeader}>
          Test
          <Logo />
        </h1>
      </button>

      <ul className={styles.sidebarList}>
        <li className={styles.sidebarItem}>
          <Button onClick={() => router.push(AppRoutes.products)} className={styles.btn}>
            <h3>Товары</h3>
            <ArrowLeftHidden />
          </Button>
          <ArrowLeftHidden />
        </li>
        <li className={clsx(styles.sidebarItem, 'transition group')}>
          <Button onClick={() => router.push(AppRoutes.algorithms)} className={styles.btn}>
            <h3>Алгоритмы</h3>
            <ArrowLeft />
          </Button>
        </li>
      </ul>
      <div className={styles.sidebarFooter}>
        {user && (
          <>
            <div className={styles.userInfo}>
              <span className={styles.roleBadge}>{getRoleName(user)}</span>
            </div>
            <div className={styles.userActions}>
              <h6 className="text-left">{user.user.name}</h6>
              <Button onClick={() => handleLogout(user.user.email)} className="!p-0 !bg-slate-100">
                <Logout />
              </Button>
            </div>
          </>
        )}
        {!user && !error && <Spinner />}
      </div>
    </div>
  )
}
