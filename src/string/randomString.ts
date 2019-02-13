/** default string length */
export const DEFAULT_LENGTH: number = 6

/**
 * generate a random string
 * 
 * @param length string length
 */
export default function randomString(length: number = DEFAULT_LENGTH): string {
  if(length > 13 || length < 1) {
    throw new Error(`Argument length should less then 14 and greater then 0`)
  }
  return Math.random().toString(36).substr(2, length)
}
