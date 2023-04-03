/**
 * Get unique key
 * @returns unique key
 */
export const getUniqueKey = () => {
  return Math.floor(Date.now() * Math.random()).toString()
}