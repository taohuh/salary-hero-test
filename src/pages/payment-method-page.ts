import { Locator, Page } from '@playwright/test'

export class PaymentMethodPage {
  readonly page: Page
  readonly buttonProceedToReview: Locator


  constructor(page: Page) {
    this.page = page
    this.buttonProceedToReview = page.getByRole('button', { name: 'Proceed to review' })
  }

  async selectPaymentMethod(cardNumber: string) {
    const cardNumberEnding = cardNumber.slice(-4)
    const regex = new RegExp(`${cardNumberEnding}`, 'g')
    await this.page.getByRole('row', { name: regex }).locator('label').click()
    await this.buttonProceedToReview.click()
  }
}