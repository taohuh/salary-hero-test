/**
 * Get price of all product in cart
 * @param addedProducts
 * @returns price of all products in cart
 */
export const getPriceOfAllProductsInCart = (addedProducts) => {
  return addedProducts.reduce((acc, product) => { return acc + product.price }, 0)
}

/**
 * Get price of product by item
 * @param addedProduct
 * @returns price of product by item
 */
export const getPriceOfProductByItem = (addedProduct) => {
  return addedProduct.price * addedProduct.quantity
}

/**
 * Get total price in cart
 * @param items
 * @param delivery
 * @param promotion
 * @returns total price in cart
 */
export const getTotalPriceInCart = (items: number, delivery: number, promotion: number) => {
  return items + delivery + 0
}

/**
 * Get unique key
 * @returns unique key
 */
export const getUniqueKey = () => {
  return Math.floor(Date.now() * Math.random()).toString()
}