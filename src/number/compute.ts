import { assertNaN } from './predicate'
import { isFalse, isZero, isInfinity } from '../is/primitive'

/**
 * increased a number value
 * 
 * @param number number
 */
export function inc(number: number): number {
  assertNaN(number)
  return number + 1
}

/**
 * decreased a number value
 * 
 * @param number number
 */
export function dec(number: number): number {
  assertNaN(number)
  return number - 1
}

/**
 * `a / b` and get integer part
 * 
 * @param a divisor
 * @param b dividend
 * @param options divintOptions
 */
export function divint(a: number, b: number, { zero = false, infinity = false }: divintOptions = {}): number {
  assertNaN(a)
  assertNaN(b)
  if(isFalse(zero) && isZero(b)) throw new Error(`dividend was 0`)
  else if(isFalse(infinity) && isInfinity(b)) throw new Error(`dividend was Infinity`)
  else return a / b | 0
}

/**
 * divint options
 */
export interface divintOptions {
  /**
   * allow diviend was 0
   */
  readonly zero?: boolean
  /**
   * allow diviend was Infinity
   */
  readonly infinity?: boolean
}
