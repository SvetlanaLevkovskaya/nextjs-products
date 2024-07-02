export const getRoleName = (user: any) => {
  if (!user || !user.roles) return ''

  const roleCount = user.roles.length

  if (roleCount === 1) {
    return 'Пользователь'
  } else {
    return 'Админ'
  }
}
