import { expect, Locator, Page } from '@playwright/test'

export class NavigationBarComponent {
  readonly page: Page
  readonly buttonYourBasket: Locator

  constructor(page: Page) {
    this.page = page
    this.buttonYourBasket = page.getByRole('button', { name: 'Show the shopping cart' })

  }

  async clickYourBasketButton() {
    const url = process.env.OWASP_JUICE_SHOP_BASKET_URL || ''

    await Promise.all([
      this.buttonYourBasket.click(),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)
  }
}