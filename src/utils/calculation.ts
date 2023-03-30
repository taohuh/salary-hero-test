
/**
 * Get total products in cart
 * @param addedProducts
 * @returns total products in cart
 */
export const getTotalProductsInCart = (addedProducts) => {
  return addedProducts.length
}

/**
 * Get price of product in cart
 * @param addedProducts
 * @returns price of products in cart
 */
export const getPriceOfProductInCart = (addedProducts) => {
  return addedProducts.reduce((acc, product) => { return acc + product.price }, 0)
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