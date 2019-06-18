import assertNaN from './assertNaN'

/**
 * decreased a number value
 * 
 * @param number number
 */
export default function dec(number: number): number {
  assertNaN(number)
  return number - 1
}
