import { deliverySpeed } from "../constants/deliverySpeed";
import { getUniqueKey } from "../utils/calculation";

export const userA = {
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  addedProducts: [
    {
      name: 'Apple Juice',
      price: 1.99,
    }
  ],
  deliverySpeed: deliverySpeed.fastDelivery,
  address: {
    country: 'Thailand',
    name: getUniqueKey(),
    mobileNumber: '1910000000', // TODO: Talk with dev why remove 0 from mobile number?
    zipCode: '10260',
    address: 'Udomsuk Road',
    city: 'Bangna',
    state: 'Bangkok',
  },
  paymentMethod: {
    cardNumber: '1231231231231231',
    name: 'Test',
    expiredMonth: '3',
    expiredYear: '2085'
  }
} as const