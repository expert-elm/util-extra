import { getInteger } from "./calculation"

//#region predicate

/**
 * test value was number type
 * 
 * @param value value
 */
export function isNumber(value: any): value is number {
  return 'number' === typeof value || '[object Number]' === toString.call(value)
}

/**
 * test value was `NaN`
 * 
 * @param number number
 */
export function isNaN(number: number): number is typeof NaN {
  return Number.isNaN(number)
}

/**
 * test value was `Infinity`
 * 
 * @param number number
 */
export function isInfinity(number: number): number is typeof Infinity {
  return !Number.isFinite(number)
}

/**
 * test value was `0`
 * @param number number
 */
export function isZero(number: number): number is 0 {
  return 0 === number
}

/**
 * test a number was integer
 * @param number number
 */
export function isInteger(number: number): boolean {
  return Number.isInteger(number)
}

/**
 * test a number was non-negative integer
 * @param number number
 */
export function isNonNegativeInteger(number: number): boolean {
  return isInteger(number) && number >= 0 && !Object.is(number, -0)
}

/**
 * test a number has decimal
 * @param number number
 */
export function hasDecimal(number: number): boolean {
  return !isZero(getInteger(number) - number)
}

/**
 * test a number is odd number
 * 
 * @param number number
 */
export function isOdd(number: number): boolean {
  return !isEven(number)
}

/**
 * test a number is even number
 * 
 * @param number number
 */
export function isEven(number: number): boolean {
  return number % 2 === 0
}

//#endregion


//#region assertion

/**
 * assert a number is integer
 * @param number number
 * @throws
 */
export function assertInteger(number: number): void {
  if(!isInteger(number)) throw new Error('number not a integer')
}

/**
 * assert a number is positive integer
 * @param number number
 */
export function assertPositiveInteger(number: number): void {
  assertInteger(number)
  if(number <= 0) throw new Error('number is not a positive integer')
}

/**
 * assert a number is positive integer or zero
 * @param number number
 */
export function assertNonNegativeInteger(number: number): void {
  if(!isNonNegativeInteger(number)) throw new Error('number is not a non-negative integer')
}

/**
 * assert a number is not NaN
 * @param number number
 * @throws
 */
export function assertNonZero(number: number): void {
  if(isZero(number)) throw new Error('number is 0')
}

/**
 * assert a number is not NaN
 * @param number number
 * @throws
 */
export function assertNonNaN(number: number): void {
  if(isNaN(number)) throw new Error('number is NaN')
}

/**
 * assert a number is not Infinity
 * @param number number
 * @throws
 */
export function assertNonInfinity(number: number): void {
  if(isInfinity(number)) throw new Error('number is Infinity')
}

//#endregion
