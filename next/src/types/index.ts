export interface Product {
  id: number
  name: string
  price: number
  manufacturerId: number
  photoUrl: string
  quantity: number
}

export interface Manufacturer {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
  pages: string[]
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  roles: number[]
}

export interface UserData {
  user: User
  roles: Role[]
}
