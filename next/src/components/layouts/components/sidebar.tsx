'use client'

import clsx from 'clsx'

import { Spinner } from '@/components/ui/Spinner/Spinner'
import { Button } from '@/components/ui/button/button'

import useFetchUser from '@/hooks/useFetchUser'

import styles from './Sidebar.module.css'

import { ArrowLeft, ArrowLeftHidden, Logo, Logout } from '../../ui/icons'

import { getRoleName } from '@/lib/utils/getRoleName'
import { useAuth } from '@/providers/auth-provider'

export const Sidebar = () => {
  const { logout } = useAuth()
  const { user, error } = useFetchUser()

  if (error) {
    return <p>Произошла ошибка: {error}</p>
  }

  return (
    <div className={styles.sidebarContainer}>
      <h1 className={styles.sidebarHeader}>
        Test
        <Logo />
      </h1>
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarItem}>
          <h3>Товары</h3>
          <ArrowLeftHidden />
        </li>
        <li className={clsx(styles.sidebarItem, 'transition group')}>
          <h3>Алгоритмы</h3>
          <ArrowLeft />
        </li>
      </ul>
      <div className={styles.sidebarFooter}>
        {user && (
          <>
            <div className={styles.userInfo}>
              <span className={styles.roleBadge}>{getRoleName(user)}</span>
            </div>
            <div className={styles.userActions}>
              <h6>{user.user.name}</h6>
              <Button onClick={logout} className={styles.logoutButton}>
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
