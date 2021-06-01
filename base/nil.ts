import { is_null } from './null'
import { is_undefined } from './undefined'

export type Nil = undefined | null

/**
 * Test a value is null or undefined
 * 
 * @param value - value
 * @returns test result
 * @example ```ts
 * is_nil(null)      // true
 * is_nil(undefined) // true
 * is_nil(0)         // false
 * is_nil('')        // false
 * ```
 * @inline
 */
export function is_nil(value: unknown): value is Nil {
  return is_undefined(value) || is_null(value)
}
