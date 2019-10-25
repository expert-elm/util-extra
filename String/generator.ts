/**
 * generate a string by Math.random
 * @param length string length
 * @throws
 */
export function generateRandomString(length: number = 6): string {
  if(length > 13 || length < 1) throw new Error(`length should less then 14 and greater then 0`)
  return Math.random().toString(36).substr(2, length)
}
