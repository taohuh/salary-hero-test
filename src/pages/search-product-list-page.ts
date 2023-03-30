import { expect, Locator, Page } from '@playwright/test'

export class SearchProductListPage {
  readonly page: Page
  readonly productCard: Locator
  readonly productItemName: Locator
  readonly cartNotification: Locator
  readonly buttonAddToCart: Locator


  constructor(page: Page) {
    this.page = page
    this.productCard = page.locator('.mat-card')
    this.productItemName = page.locator('.item-name')
    this.cartNotification = page.locator('.warn-notification')
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to Basket' })
  }

  async clickAddProductToCart(productName: string) {
    await this.productCard.filter({ hasText: productName }).getByRole('button', { name: 'Add to Basket' }).click()

    const response = await this.page.waitForResponse(response => response.url().includes('/rest/basket/') && response.status() === 200);
    const responseBody = await response.json()
    expect(responseBody.status).toBe('success')
  }

  async verifyCartNotificationNumber(numberOfProductInCart: string) {
    expect(await this.cartNotification.textContent()).toContain(numberOfProductInCart)
  }

  async verifyAddToCartSuccessfullySnackbar(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible()
  }
}