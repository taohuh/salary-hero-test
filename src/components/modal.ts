import { Locator, Page } from '@playwright/test'

export class ModalComponent {
  readonly page: Page
  readonly dismissButton: Locator
  readonly dismissCookieButton: Locator

  constructor(page: Page) {
    this.page = page
    this.dismissButton = page.locator('button', { hasText: 'Dismiss'})
    this.dismissCookieButton = page.getByLabel('dismiss cookie message')
  }

  async closeWelcomeModal() {
    await this.dismissButton.click()
  }

  async closeCookieModal() {
    await this.dismissCookieButton.click()
  }
}