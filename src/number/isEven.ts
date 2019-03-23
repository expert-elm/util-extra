import isOdd from "./isOdd"

/**
 * test number is even
 * 
 * @param number number
 */
export default function isEven(number: number): boolean {
  return !isOdd(number)
}
