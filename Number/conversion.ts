import { assertNonNegativeInteger } from "./predicate"
import { isTrue } from '../Boolean/predicate'

/**
 * convert to numeral string
 * @example
 * ```ts
 * toNumeralString(42) 
 * //=> '42nd'
 * ```
 * @param number numbe
 * @throws
 */
export function toNumeralString(number: number): string {
  assertNonNegativeInteger(number)
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
 * prepand zero
 * @example
 * ```ts
 * toPrependZero(42, 5)
 * //=> 00042
 * ```
 * @param number number
 * @param max max length
 * @param options toPrependZeroOptions
 */
export function toPrependZero(number: number, max: number, { overflow = true }: toPrependZeroOptions = {}): string {
  assertNonNegativeInteger(number)
  assertNonNegativeInteger(max)
  const str = number.toString()
  const len = str.length
  if(isTrue(overflow) && len > max) throw new Error(`number length is large then max length`)
  return str.padStart(max, '0')
}

/**
 * toPrependZero options
 */
interface toPrependZeroOptions {
  /**
   * throw when number string length grate then max length
   */
  readonly overflow?: boolean
}
