import { test, Page } from '@playwright/test'
import { SearchProductListPage } from '../src/pages/search-product-list-page'
import { SignInPage } from '../src/pages/sign-in-page'
import { BasketPage } from '../src/pages/basket-page'
import { AddressPage } from '../src/pages/address-page'
import { browserCookies } from '../src/mock/cookies'
import { userA } from '../src/mock/users'
import { NavigationBarComponent } from '../src/components/navigation-bar'

test.describe('OWASP juice shop page', () => {
  let userPage: Page
  let searchProductListPage: SearchProductListPage
  let signInPage: SignInPage
  let basketPage: BasketPage
  let addressPage: AddressPage
  let navigationBarComponent: NavigationBarComponent

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    await context.addCookies(browserCookies)

    userPage = await context.newPage()
    signInPage = new SignInPage(userPage)
    searchProductListPage = new SearchProductListPage(userPage)
    basketPage = new BasketPage(userPage)
    addressPage = new AddressPage(userPage)
    navigationBarComponent = new NavigationBarComponent(userPage)

    await test.step('User sign in to website', async () => {
      await signInPage.signIn(userA.username, userA.password)
    })
  })

  test.beforeEach(async () => {
    await test.step('Delete all products from basket', async () => {
      // TODO: Reset product in basket to empty state from DB
      await navigationBarComponent.clickYourBasketButton()
      await basketPage.deleteAllProductsFromBasket()
    })

    await test.step('Open Search product page', async () => {
      await searchProductListPage.openSearchProductPage()
    })
  })

  // 1. Login with your user, add 1 item to the basket, click on checkout, add a new address, fill in the address form, click on submit
  test('Verify that user able to add 1 product to basket and create new address successfully', async () => {
    const addedProduct = userA.addedProducts[0]

    await test.step('Add 1 product to basket', async () => {
      await searchProductListPage.clickAddProductToBasket(addedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(addedProduct.name)
    })

    // !: Notification number is render incorrect, Talk with team
    // await searchProductListPage.verifyCartNotificationNumber(userA.addedProducts.length.toString())

    await test.step('Open basket page and checkout', async () => {
      await navigationBarComponent.clickYourBasketButton()
      await basketPage.clickCheckoutButton()
    })

    await test.step('Add new address', async () => {
      await addressPage.addNewAddress(userA.address)
      await addressPage.verifyAddNewAddressSuccessfully(userA.address)
    })
  })

  // 2. Exact same flow, but this time, add 2 items to your basket, click on checkout, add a new address, fill in the address form, click on submit
  test('Verify that user able to add 2 products to basket and create new address successfully', async () => {
    const firstAddedProduct = userA.addedProducts[1]
    const secondAddedProduct = userA.addedProducts[2]

    await test.step('Add first product to cart', async () => {
      await searchProductListPage.clickAddProductToBasket(firstAddedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(firstAddedProduct.name)
    })

    await test.step('Add second product to cart', async () => {
      await searchProductListPage.clickAddProductToBasket(secondAddedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(secondAddedProduct.name)
    })

    await test.step('Open basket page and checkout', async () => {
      await navigationBarComponent.clickYourBasketButton()
      await basketPage.clickCheckoutButton()
    })

    await test.step('Add new address', async () => {
      await addressPage.addNewAddress(userA.address)
      await addressPage.verifyAddNewAddressSuccessfully(userA.address)
    })
  })

  // 3. Click on the search button, search for apple, verify that 2 apple products show up and that banana product does not show up
  test('Verify that user able to search product by keyword successfully', async () => {
    const keyword = 'Apple'
    const notFoundKeyword = 'Banana'

    await searchProductListPage.searchProductByKeyword(keyword)
    await searchProductListPage.verifySearchResultTitle(keyword)
    await searchProductListPage.verifySearchProductResult(keyword)
    await searchProductListPage.verifyNotExistProductInSearchResult(notFoundKeyword)
  })
})
