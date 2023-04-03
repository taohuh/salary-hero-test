import { expect, Locator, Page } from '@playwright/test'

export class BasketPage {
  readonly page: Page
  readonly buttonCheckout: Locator
  readonly iconDelete: Locator

  constructor(page: Page) {
    this.page = page
    this.buttonCheckout = page.getByRole('button', { name: 'Checkout' })
    this.iconDelete = page.locator('.mat-column-remove > button')
  }

  async clickCheckoutButton() {
    const url = process.env.OWASP_JUICE_SHOP_SELECT_ADDRESS_URL || ''

    await Promise.all([
      this.buttonCheckout.click(),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)
  }

  async deleteAllProductsFromBasket() {
    const numberOfDeleteIcon = await this.iconDelete.count()

    for (let index = 0; index < numberOfDeleteIcon; index++) {
      await this.iconDelete.nth(index).click()
    }
  }
}
