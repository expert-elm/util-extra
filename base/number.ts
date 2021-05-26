import { is_false } from './boolean'
import { object_type } from './object'

/**
 * Test value is number
 * 
 * @param value test value
 * @returns true when value is number, otherwise false
 * @example ```ts
 * is_number(42) // true
 * is_number(Number()) // true
 * is_number('foo') // false
 * ```
 */
export function is_number(value: any): value is number {
  return 'number' === typeof value || 'Number' === object_type(value)
}

/**
 * Test number is NaN, wrap function `Number.isNaN` 
 * 
 * @param number number
 * @returns result of `Number.isNaN`
 * @example ```ts
 * is_nan(42) // false
 * is_nan(NaN) // true
 * ```
 * @todo return type should be `number is typeof NaN`
 */
export function is_nan(number: number): boolean {
  return Number.isNaN(number)
}

/**
 * Test number is Infinity, wrap function `Number.isFinite`
 * 
 * @param number number
 * @returns result of `Number.isFinite`
 * @example ```ts
 * is_infinity(42) // false
 * is_infinity(Infinity) // true
 * ```
 * @todo return type should be `number is typeof Infinity`
 */
export function is_infinity(number: number): Boolean {
  return !Number.isFinite(number)
}

/**
 * Test value is `0`
 * @param number number
 */
export function is_zero(number: number): number is 0 {
  return 0 === number
}

/**
 * Test a number is integer, wrap `Number.isInteger`
 * @param number number
 */
export function is_integer(number: number): boolean {
  return Number.isInteger(number)
}

/**
 * Test a number was non-negative integer
 * @param number number
 */
export function is_non_negative_integer(number: number): boolean {
  return is_integer(number) && number >= 0 && !Object.is(number, -0)
}

/**
 * Test a number has decimal
 * @param number number
 */
export function has_decimal(number: number): boolean {
  return !is_zero(get_integer(number) - number)
}

/**
 * Test number is a odd number
 * 
 * @param number number
 */
export function is_odd(number: number): boolean {
  return !is_even(number)
}

/**
 * Test a number is a even number
 * 
 * @param number number
 */
export function is_even(number: number): boolean {
  return number % 2 === 0
}

//#endregion


//#region assertion

/**
 * assert a number is integer
 * @param number number
 * @throws
 */
export function assert_integer(number: number): void {
  if(!is_integer(number)) throw new Error('number not a integer')
}

/**
 * assert a number is positive integer
 * @param number number
 */
export function assertPositiveInteger(number: number): void {
  assert_integer(number)
  if(number <= 0) throw new Error('number is not a positive integer')
}

/**
 * assert a number is positive integer or zero
 * @param number number
 */
export function assert_non_negative_integer(number: number): void {
  if(!is_non_negative_integer(number)) throw new Error('number is not a non-negative integer')
}

/**
 * assert a number is not NaN
 * @param number number
 * @throws
 */
export function assertNonZero(number: number): void {
  if(is_zero(number)) throw new Error('number is 0')
}

/**
 * assert a number is not NaN
 * @param number number
 * @throws
 */
export function assert_non_nan(number: number): void {
  if(is_nan(number)) throw new Error('number is NaN')
}

/**
 * assert a number is not Infinity
 * @param number number
 * @throws
 */
export function assert_non_infinity(number: number): void {
  if(is_infinity(number)) throw new Error('number is Infinity')
}


/**
 * increased a number value
 * @param number number
 * @throws
 */
export function inc(number: number): number {
  assert_integer(number)
  return number + 1
}

/**
 * decreased a number value
 * @param number number
 * @throws
 */
export function dec(number: number): number {
  assert_integer(number)
  return number - 1
}

/**
 * Get integer part of number
 * @param number number
 */
export function get_integer(number: number): number {
  assert_non_nan(number)
  assert_non_infinity(number)
  return number | 0
}


/**
 * `a / b` and get integer part
 * 
 * @param a divisor
 * @param b dividend
 * @param options divintOptions
 */
export function divint(a: number, b: number, { zero = false, infinity = false }: DivintOptions = {}): number {
  assert_non_nan(a)
  assert_non_nan(b)
  if(is_false(zero) && is_zero(b)) throw new Error(`dividend was 0`)
  else if(is_false(infinity) && is_infinity(b)) throw new Error(`dividend was Infinity`)
  else return a / b | 0
}

/**
 * divint options
 */
export interface DivintOptions {
  /**
   * allow diviend was 0
   */
  readonly zero?: boolean
  /**
   * allow diviend was Infinity
   */
  readonly infinity?: boolean
}


/**
 * convert to numeral string
 * @example ```ts
 * to_numeral_string(42) // '42nd'
 * ```
 * @param number numbe
 * @throws
 */
 export function to_numeral_string(number: number): string {
  assert_non_negative_integer(number)
  const str = number.toString()
  const len = str.length
  switch(str.charAt(len - 1)) {
    case '1': return str + 'st'
    case '2': return str + 'nd'
    case '3': return str + 'rd'
    default: return str + 'th'
  }
}

/**
 * Prepand zero
 
 * @param number number
 * @param max max length
 * @param overflow throw when string length greate then max
 * 
 * @example
 * ```ts
 * prepend_zero(42, 5) // 00042
 * ``` 
 */
export function prepend_zero(number: number, max: number, overflow: boolean = true): string {
  assert_non_negative_integer(number)
  assert_non_negative_integer(max)
  const str = number.toString()
  const len = str.length
  if(overflow && len > max) throw new Error(`number length is large then max length`)
  return str.padStart(max, '0')
}
