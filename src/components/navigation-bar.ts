import { expect, Locator, Page } from '@playwright/test'

export class NavigationBarComponent {
  readonly page: Page
  readonly buttonYourBasket: Locator
  readonly inputSearchProduct: Locator
  readonly iconSearch: Locator

  constructor(page: Page) {
    this.page = page
    this.buttonYourBasket = page.getByRole('button', { name: 'Show the shopping cart' })
    this.inputSearchProduct = page.locator('#mat-input-0')
    this.iconSearch = page.locator('.mat-search_icon-search')
  }

  async clickYourBasketButton() {
    const url = process.env.OWASP_JUICE_SHOP_BASKET_URL || ''

    await Promise.all([
      this.buttonYourBasket.click(),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)

    const response = await this.page.waitForResponse(response => response.url().includes('/rest/basket/') && response.status() === 200);
    const responseBody = await response.json()
    expect(responseBody.status).toBe('success')
  }

  async searchProductByKeyword(keyword: string) {
    await this.iconSearch.click()
    await this.inputSearchProduct.clear()
    await this.inputSearchProduct.fill(keyword)
    await this.inputSearchProduct.press('Enter')
    await expect(this.inputSearchProduct).toHaveValue(keyword)
  }
}