import assertNaN from './assertNaN'

/**
 * increased a number value
 * 
 * @param number number
 */
export default function inc(number: number): number {
  assertNaN(number)
  return number + 1
}
