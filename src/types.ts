import { deliverySpeed } from "./constants/deliverySpeed"

type TDeliverSpeedKeys = keyof typeof deliverySpeed
export type TDeliverySpeed = typeof deliverySpeed[TDeliverSpeedKeys]

export type TAddress = {
  country: string,
  name: string,
  mobileNumber: string,
  zipCode: string,
  address: string,
  city: string,
  state: string,
}

export type TPaymentMethod = {
  cardNumber: string,
  name: string,
  expiredMonth: string,
  expiredYear: string,
}

export type TProducts = Array<TProduct>

export type TProduct = {
  name: string,
  price: number
}

export type TUser = {
  username: string,
  password: string,
  addedProducts: TProduct[],
  address: TAddress,
  payment: TPaymentMethod,
}

export type TOrderSummary = {
  items: number,
  delivery: number,
  promotion: number,
  totalPrice: number,
}