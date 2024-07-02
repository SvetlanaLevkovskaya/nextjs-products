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
