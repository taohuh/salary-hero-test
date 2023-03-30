import { expect, Locator, Page } from '@playwright/test'

export class BasketPage {
  readonly page: Page
  readonly buttonCheckout: Locator

  constructor(page: Page) {
    this.page = page
    this.buttonCheckout = page.getByRole('button', { name: 'Checkout' })
  }

  async clickCheckoutButton() {
    const url = process.env.OWASP_JUICE_SHOP_SELECT_ADDRESS_URL || ''

    await Promise.all([
      this.buttonCheckout.click(),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)
  }
}
