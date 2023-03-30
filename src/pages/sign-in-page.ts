import { expect, Locator, Page } from '@playwright/test'
import { ModalComponent } from '../../src/components/modal'

export class SignInPage {
  readonly page: Page
  readonly modalComponent: ModalComponent
  readonly inputEmail: Locator
  readonly inputPassword: Locator
  readonly buttonLogin: Locator

  constructor(page: Page) {
    this.page = page
    this.modalComponent = new ModalComponent(this.page)
    this.inputEmail = page.getByRole('textbox', { name: 'Text field for the login email' })
    this.inputPassword = page.getByRole('textbox', { name: 'Text field for the login password' })
    this.buttonLogin = page.getByRole('button', { name: 'Login' })
  }

  async openSignInPage() {
    const url = process.env.OWASP_JUICE_SHOP_LOGIN_URL || ''

    await Promise.all([
      this.page.goto(url),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)

    await this.modalComponent.closeWelcomeModal()
    await this.modalComponent.closeCookieModal()
  }

  async signIn(username: string, password: string) {
    await this.openSignInPage()
    await this.inputEmail.fill(username)
    await this.inputPassword.fill(password)

    const url = process.env.OWASP_JUICE_SHOP_SEARCH_URL || ''

    await Promise.all([
      this.buttonLogin.click(),
      this.page.waitForURL(url)
    ])

    await expect(this.page).toHaveURL(url)
  }
}
