import { expect, Locator, Page } from '@playwright/test'

export class SnackbarComponent {
  readonly page: Page
  readonly snackbarContent: Locator
  readonly buttonClose: Locator

  constructor(page: Page) {
    this.page = page
    this.snackbarContent = page.locator('.mat-simple-snack-bar-content')
    this.buttonClose = page.getByRole('button', { name: 'X', exact: true })
  }

  async closeSnackbar() {
    await this.buttonClose.click()
  }

  async verifySnackbarContent(content) {
    await expect(this.snackbarContent).toHaveText(content)
    await this.closeSnackbar()
  }
}