'use client'

import { Spinner } from '@/components/ui/Spinner/Spinner'

import useFetchUser from '@/hooks/useFetchUser'

import { ArrowLeft, ArrowLeftHidden, Logo, Logout } from '../../ui/icons'

import { getRoleName } from '@/lib/utils/getRoleName'
import { useAuth } from '@/providers/auth-provider'

const Sidebar = () => {
  const { logout } = useAuth()
  const { user, error } = useFetchUser()

  if (error) {
    return <p>Произошла ошибка: {error}</p>
  }

  return (
    <div className="h-screen w-56 bg-slate-100 flex flex-col">
      <div className="h1-text flex items-center gap-1 justify-center py-3 text-slate-100 mb-6 bg-gray-800 rounded-br-2xl">
        Test
        <Logo />
      </div>
      <ul className="p-[10px] flex flex-col gap-4">
        <li className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group">
          <h3>Товары</h3>
          <ArrowLeftHidden />
        </li>
        <li className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group">
          <h3>Алгоритмы</h3>
          <ArrowLeft />
        </li>
      </ul>
      <div className="mt-auto p-5 text-slate-900">
        {user && (
          <>
            <div className="flex space-x-2 mb-4">
              <span className="bg-gray-300 px-2 py-1 rounded-3xl text-sm">{getRoleName(user)}</span>
            </div>
            <div className="w-full flex justify-between">
              <h6>{user.user.name}</h6>
              <button onClick={logout}>
                <Logout />
              </button>
            </div>
          </>
        )}
        {!user && !error && <Spinner />}
      </div>
    </div>
  )
}

export default Sidebar
