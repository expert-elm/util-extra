import { isZero, isInfinity, assertNonNaN, assertInteger, assertNonInfinity } from './predicate'
import { isFalse } from '../Boolean/predicate'

/**
 * increased a number value
 * @param number number
 * @throws
 */
export function inc(number: number): number {
  assertInteger(number)
  return number + 1
}

/**
 * decreased a number value
 * @param number number
 * @throws
 */
export function dec(number: number): number {
  assertInteger(number)
  return number - 1
}

/**
 * get integer part of number
 * @param number number
 */
export function getInteger(number: number): number {
  assertNonNaN(number)
  assertNonInfinity(number)
  return number | 0
}


/**
 * `a / b` and get integer part
 * 
 * @param a divisor
 * @param b dividend
 * @param options divintOptions
 */
export function divint(a: number, b: number, { zero = false, infinity = false }: divintOptions = {}): number {
  assertNonNaN(a)
  assertNonNaN(b)
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
