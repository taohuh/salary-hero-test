import { expect, Locator, Page } from '@playwright/test'

export class SnackbarComponent {
  readonly page: Page
  readonly snackbarContent: Locator

  constructor(page: Page) {
    this.page = page
    this.snackbarContent = page.locator('.mat-simple-snack-bar-content')
  }

  async verifySnackbarContent(content) {
    expect(this.snackbarContent.filter({ hasText: content })).toBeVisible()
  }
}