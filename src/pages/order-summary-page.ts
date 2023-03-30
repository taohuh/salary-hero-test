import { expect, Locator, Page } from '@playwright/test'
import { TAddress, TOrderSummary, TPaymentMethod, TProduct } from '../types'

export class OrderSummaryPage {
  readonly page: Page
  readonly snackbarContent: Locator
  readonly productNameInCart: Locator
  readonly productQuantityInCart: Locator
  readonly productPriceInCart: Locator
  readonly orderSummaryTotalPriceCell: Locator
  readonly orderSummaryPriceCell: Locator
  readonly buttonPlaceYourOrder: Locator

  constructor(page: Page) {
    this.page = page
    this.snackbarContent = page.locator('.mat-simple-snack-bar-content')
    this.productNameInCart = page.locator('.mat-column-product >> visible = true')
    this.productQuantityInCart = page.locator('.mat-column-quantity >> visible = true')
    this.productPriceInCart = page.locator('.mat-column-price >> visible = true')
    this.orderSummaryPriceCell = this.page.locator('.mat-cell.price')
    this.orderSummaryTotalPriceCell = this.page.locator('.mat-footer-cell.price')
    this.buttonPlaceYourOrder = this.page.getByRole('button', { name: 'Complete your purchase' })
  }

  async verifySelectedAddress(address: TAddress) {
    await expect(this.page.getByText(address.name)).toBeVisible()
    await expect(this.page.getByText(`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}`)).toBeVisible()
    await expect(this.page.getByText(address.country)).toBeVisible()
    await expect(this.page.getByText(`Phone Number ${address.mobileNumber}`)).toBeVisible()
  }

  async verifySelectedPaymentMethod(paymentMethod: TPaymentMethod) {
    const cardNumberEnding = paymentMethod.cardNumber.slice(-4)
    await expect(this.page.getByText(`Card ending in ${cardNumberEnding}`)).toBeVisible()
    await expect(this.page.getByText(`Card Holder ${paymentMethod.name}`)).toBeVisible()
  }

  async verifyYourBasketDetail(addedProduct: TProduct, totalProducts: string) {
    expect(await this.productNameInCart.textContent()).toContain(addedProduct.name)
    expect(await this.productQuantityInCart.textContent()).toContain(totalProducts.toString())
    expect(await this.productPriceInCart.textContent()).toContain(addedProduct.price.toString())
  }

  async verifyOrderSummary(orderSummary: TOrderSummary) {
    const orderSummaryRowItems = this.orderSummaryPriceCell.nth(0)
    const orderSummaryRowDeliver = this.orderSummaryPriceCell.nth(1)
    const orderSummaryRowPromotion = this.orderSummaryPriceCell.nth(2)

    expect(await orderSummaryRowItems.textContent()).toContain(orderSummary.items.toString())
    expect(await orderSummaryRowDeliver.textContent()).toContain(orderSummary.delivery.toString())
    expect(await orderSummaryRowPromotion.textContent()).toContain(orderSummary.promotion.toString())
    expect(await this.orderSummaryTotalPriceCell.textContent()).toContain(orderSummary.totalPrice.toString())
  }

  async clickPlaceYourOrderButton() {
    await this.buttonPlaceYourOrder.click()
  }
}