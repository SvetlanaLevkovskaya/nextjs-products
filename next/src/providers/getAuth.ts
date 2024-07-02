import { cookies } from 'next/headers'

export enum CookiesNamespace {
  ACCESS_TOKEN = 'token',
}

export function getAuth() {
  const authToken = cookies().get(CookiesNamespace.ACCESS_TOKEN)?.value
  const isAuth = !!authToken

  return { authToken, isAuth }
}
