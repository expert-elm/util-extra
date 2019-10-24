import { isInfinity, isNaN } from '../is/primitive'

/**
 * test a number is odd number
 * 
 * @param number number
 */
export function isOdd(number: number): boolean {
  return number % 2 === 1
}

/**
 * test a number is even number
 * 
 * @param number number
 */
export function isEven(number: number): boolean {
  return !isOdd(number)
}


/**
 * assert a number is NaN
 * @param number number
 */
export function assertNaN(number: number): number {
  if(isNaN(number)) throw new Error(`number was NaN`)
  return number
}

/**
 * assert a number is Infinity
 * @param number number
 */
export function assertInfinity(number: number): number {
  if(isInfinity(number)) throw new Error(`number was Infinity`)
  return number
}

/**
 * assert a number is NaN or Infinity
 * @param number number
 */
export function assertNaNAndInfinity(number: number): number {
  return assertNaN(number) && assertInfinity(number)
}
