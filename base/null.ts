/**
 * Test value is `null`
 * 
 * @param value - value
 * @returns test result
 * @example ```ts
 * is_null(null)      // true
 * is_null(undefined) // false
 * ```
 */
export function is_null(value: unknown): value is null {
  return null === value
}
