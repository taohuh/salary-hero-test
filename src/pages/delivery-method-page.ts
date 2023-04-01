import { expect, Locator, Page } from '@playwright/test'
import { TAddress, TDeliverySpeed } from '../types'

export class DeliveryMethodPage {
  readonly page: Page
  readonly buttonProceedToDeliveryMethodSelection: Locator

  constructor(page: Page) {
    this.page = page
    this.buttonProceedToDeliveryMethodSelection = page.getByRole('button', { name: 'Proceed to delivery method selection' })
  }

  async verifyDeliverAddress(address: TAddress) {
    await expect(this.page.getByText(address.name)).toBeVisible()
    await expect(this.page.getByText(`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}`)).toBeVisible()
    await expect(this.page.getByText(address.country)).toBeVisible()
    await expect(this.page.getByText(`Phone Number ${address.mobileNumber}`)).toBeVisible()
  }

  async selectDeliverySpeed(deliverySpeed: TDeliverySpeed) {
    const regex = new RegExp(`${deliverySpeed.name}`, 'g')
    await this.page.getByRole('row', { name: regex }).getByRole('cell').first().click()
    await this.buttonProceedToDeliveryMethodSelection.click()
  }
}