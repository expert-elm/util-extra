/**
 * Test a value is `undefined`
 * 
 * @param value - value
 * @returns test result
 * @example ```ts
 * is_undefined(undefined) // true
 * is_undefined(null)      // false
 * ```
 * @inline
 */
export function is_undefined(value: unknown): value is undefined {
  return undefined === value  
}
