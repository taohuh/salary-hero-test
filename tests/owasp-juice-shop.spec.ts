import { test, Page } from '@playwright/test'
import { SearchProductListPage } from '../src/pages/search-product-list-page'
import { SignInPage } from '../src/pages/sign-in-page'
import { BasketPage } from '../src/pages/basket-page'
import { AddressPage } from '../src/pages/address-page'
import { userA } from '../src/mock/users'
import { getPriceOfProductByItem, getPriceOfAllProductsInCart, getTotalPriceInCart } from '../src/utils/calculation'
import { NavigationBarComponent } from '../src/components/navigation-bar'
import { DeliveryMethodPage } from '../src/pages/delivery-method-page'
import { OrderSummaryPage } from '../src/pages/order-summary-page'
import { PaymentMethodPage } from '../src/pages/payment-method-page'

test.describe.only('OWASP juice shop page', () => {
  let userPage: Page
  let searchProductListPage: SearchProductListPage
  let signInPage: SignInPage
  let basketPage: BasketPage
  let addressPage: AddressPage
  let deliveryMethodPage: DeliveryMethodPage
  let paymentMethodPage: PaymentMethodPage
  let orderSummaryPage: OrderSummaryPage
  let navigationBarComponent: NavigationBarComponent

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()

    userPage = await context.newPage()
    signInPage = new SignInPage(userPage)
    searchProductListPage = new SearchProductListPage(userPage)
    basketPage = new BasketPage(userPage)
    addressPage = new AddressPage(userPage)
    deliveryMethodPage = new DeliveryMethodPage(userPage)
    paymentMethodPage = new PaymentMethodPage(userPage)
    orderSummaryPage = new OrderSummaryPage(userPage)
    navigationBarComponent = new NavigationBarComponent(userPage)

    await test.step('User sign in to website', async () => {
      await signInPage.signIn(userA.username, userA.password)
    })

    // TODO: Reset address to empty state
    // GET https://salaryhero-qa-challenge.herokuapp.com/api/Addresss

    // TODO: Reset product in cart to empty state
    // GET https://salaryhero-qa-challenge.herokuapp.com/rest/basket/6
  })

  // 1. Login with your user, add 1 item to the basket, click on checkout, add a new address, fill in the address form, click on submit
  test('Verify that user able to buy 1 product successfully', async () => {
    const addedProduct = userA.addedProducts[0]

    await test.step('Add 1 product to cart', async () => {
      await searchProductListPage.clickAddProductToCart(addedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(addedProduct.name)
    })

    // !: Notification number is render incorrect, Talk with team
    // await searchProductListPage.verifyCartNotificationNumber(userA.addedProducts.length.toString())

    await test.step('Open basket page', async () => {
      await navigationBarComponent.clickYourBasketButton()
      await basketPage.clickCheckoutButton()
    })

    await test.step('Add new address', async () => {
      await addressPage.addNewAddress(userA.address)
      await addressPage.verifyAddNewAddressSuccessfully(userA.address)
      await addressPage.selectAddress(userA.address.name)
    })

    await test.step('Select deliver speed', async () => {
      await deliveryMethodPage.verifyDeliverAddress(userA.address)
      await deliveryMethodPage.selectDeliverySpeed(userA.deliverySpeed)
    })

    await test.step('Select payment method', async () => {
      await paymentMethodPage.selectPaymentMethod(userA.paymentMethod.cardNumber)
    })

    await test.step('Verify order summary', async () => {
      await orderSummaryPage.verifySelectedAddress(userA.address)
      await orderSummaryPage.verifySelectedPaymentMethod(userA.paymentMethod)
      await orderSummaryPage.verifyYourBasketDetail(userA.addedProducts)

      const items = getPriceOfProductByItem(userA.addedProducts[0])
      const delivery = userA.deliverySpeed.price
      const promotion = 0
      const totalPrice = getTotalPriceInCart(items, delivery, promotion)

      await orderSummaryPage.verifyOrderSummary({
        items: items,
        delivery: delivery,
        promotion: promotion,
        totalPrice: totalPrice,
      })
    })
  })

  // 2. Exact same flow, but this time, add 2 items to your basket, click on checkout, add a new address, fill in the address form, click on submit
  test('Verify that user able to buy 2 products successfully', async () => {
    const firstAddedProduct = userA.addedProducts[0]
    const secondAddedProduct = userA.addedProducts[1]

    await test.step('Open Search product page', async () => {
      await searchProductListPage.openSearchProductPage()
    })

    await test.step('Add first product to cart', async () => {
      await searchProductListPage.clickAddProductToCart(firstAddedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(firstAddedProduct.name)
    })

    await test.step('Add second product to cart', async () => {
      await searchProductListPage.clickAddProductToCart(secondAddedProduct.name)
      await searchProductListPage.verifyAddToCartSuccessfullySnackbar(secondAddedProduct.name)
    })

    await test.step('Open basket page', async () => {
      await navigationBarComponent.clickYourBasketButton()
      await basketPage.clickCheckoutButton()
    })

    await test.step('Add new address', async () => {
      await addressPage.addNewAddress(userA.address)
      await addressPage.verifyAddNewAddressSuccessfully(userA.address)
      await addressPage.selectAddress(userA.address.name)
    })

    await test.step('Select deliver speed', async () => {
      await deliveryMethodPage.verifyDeliverAddress(userA.address)
      await deliveryMethodPage.selectDeliverySpeed(userA.deliverySpeed)
    })

    await test.step('Select payment method', async () => {
      await paymentMethodPage.selectPaymentMethod(userA.paymentMethod.cardNumber)
    })

    await test.step('Verify order summary', async () => {
      await orderSummaryPage.verifySelectedAddress(userA.address)
      await orderSummaryPage.verifySelectedPaymentMethod(userA.paymentMethod)
      await orderSummaryPage.verifyYourBasketDetail(userA.addedProducts)

      const items = getPriceOfAllProductsInCart(userA.addedProducts)
      const delivery = userA.deliverySpeed.price
      const promotion = 0
      const totalPrice = getTotalPriceInCart(items, delivery, promotion)

      await orderSummaryPage.verifyOrderSummary({
        items: items,
        delivery: delivery,
        promotion: promotion,
        totalPrice: totalPrice,
      })
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
