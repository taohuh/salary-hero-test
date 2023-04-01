import { Locator, Page } from '@playwright/test'
import { SnackbarComponent } from '../components/snackbar'
import { TAddress } from '../types'

export class AddressPage {
  readonly page: Page
  readonly buttonAddNewAddress: Locator
  readonly inputCountry: Locator
  readonly inputName: Locator
  readonly inputMobileNumber: Locator
  readonly inputZipcode: Locator
  readonly inputAddress: Locator
  readonly inputCity: Locator
  readonly inputState: Locator
  readonly buttonSubmitNewAddress: Locator
  readonly buttonProceedToPaymentSelection: Locator
  readonly snackbarComponent: SnackbarComponent
  readonly addressRow: Locator
  readonly radioButtonAddressRow: Locator

  constructor(page: Page) {
    this.page = page
    this.snackbarComponent = new SnackbarComponent(this.page)
    this.buttonAddNewAddress = page.getByRole('button', { name: 'Add a new address' })
    this.inputCountry = page.getByPlaceholder('Please provide a country.')
    this.inputName = page.getByPlaceholder('Please provide a name.')
    this.inputMobileNumber = page.getByPlaceholder('Please provide a mobile number.')
    this.inputZipcode = page.getByPlaceholder('Please provide a ZIP code.')
    this.inputAddress = page.getByPlaceholder('Please provide an address.')
    this.inputCity = page.getByPlaceholder('Please provide a city.')
    this.inputState = page.getByPlaceholder('Please provide a state.')
    this.addressRow = page.locator('.mat-row')
    this.radioButtonAddressRow = page.locator('.mat-column-Selection')
    this.buttonSubmitNewAddress = page.locator('#submitButton')
    this.buttonProceedToPaymentSelection = page.getByRole('button', { name: 'Proceed to payment selection' })
  }

  async addNewAddress(address: TAddress) {
    await this.buttonAddNewAddress.click()
    await this.inputCountry.fill(address.country)
    await this.inputName.fill(address.name)
    await this.inputMobileNumber.fill(address.mobileNumber)
    await this.inputZipcode.fill(address.zipCode)
    await this.inputAddress.fill(address.address)
    await this.inputCity.fill(address.city)
    await this.inputState.fill(address.state)
    await this.buttonSubmitNewAddress.click()
  }

  async verifyAddNewAddressSuccessfully(address: TAddress) {
    await this.snackbarComponent.verifySnackbarContent(`The address at ${address.city} has been successfully added to your addresses.`)
  }

  async selectAddress(addressName: string) {
    await this.addressRow.filter({ hasText: addressName }).locator(this.radioButtonAddressRow).click()
    await this.buttonProceedToPaymentSelection.click()
  }
}
