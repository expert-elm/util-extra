import { object_type } from './object'

/**
 * Convert value to boolean
 * 
 * @param value - value
 * @returns boolean
 * 
 * @example ```ts
 * to_boolean(42)  // true
 * to_boolean(NaN) // false
 * ```
 */
export function to_boolean(value: any): boolean {
  return Boolean(value)
}

/**
 * Test value is boolean type
 * 
 * @param value - value
 * @returns value is boolean type or not
 * 
 * @example```ts
 * is_boolean(false)     // true
 * is_boolean(Boolean()) // true
 * is_boolean(null)      // false
 * ```
 */
export function is_boolean(value: any): value is boolean {
  return 'boolean' === typeof value || 'Boolean' === object_type(value)
}

/**
 * Test a boolean value is true
 * 
 * @param bool - boolean
 * @returns test result
 * 
 * @example```ts
 * is_true(true)      // true
 * is_true(Boolean()) // false
 * ```
 */
export function is_true(bool: boolean): bool is true {
  return true === bool
}

/**
 * Test a boolean value is false
 * 
 * @param bool - boolean
 * @returns test result
 * 
 * @example```ts
 * is_false(false)     // true
 * is_false(Boolean()) // true
 * is_false(true)      // false
 * ```
 */
export function is_false(bool: boolean): bool is false {
  return false === bool
}

/**
 * Falsy type
 * 
 * @todo loss NaN
 */
export type Falsy = 0 | -0 | false | null | undefined | ''

/**
 * Test a value is a falsy value, one of `0`, `-0`, `false`, `null`, `undefined`, `NaN`, `""`
 * 
 * @param value value
 * @returns test result
 * 
 * @example```ts
 * is_falsy(null) // true
 * is_falsy([])   // false
 * is_falsy({})   // false
 * is_falsy(42)   // false
 * ```
 */
export function is_falsy(value: any): boolean {
  return false === to_boolean(value)
}

/**
 * Test a value is not a falsy value
 * 
 * @param value value
 * @returns test result
 * 
 * @example ```ts
 * is_truthy(42)    // true
 * is_truthy({})    // true
 * is_truthy(false) // false
 * ```
 */
export function is_truthy(value: any): boolean {
  return !is_falsy(value)
}
