import { object_type } from './object'

/**
 * convert value to boolean
 * @param value value
 */
export function to_boolean(value: any): boolean {
  return Boolean(value)
}

/**
 * test a value was boolean type
 * @param value value
 */
 export function is_boolean(value: any): value is boolean {
  return 'boolean' === typeof value || 'Boolean' === object_type(value)
}

/**
 * test a boolean was true
 * @param bool boolean
 */
export function is_true(bool: boolean): bool is true {
  return true === bool
}

/**
 * test a boolean was false
 * @param bool boolean
 */
export function is_false(bool: boolean): bool is false {
  return false === bool
}

/**
 * test a value was not `0`, `-0`, `false`, `null`, `undefined`, `NaN`, `""`
 * @param value value
 */
export function is_falsy(value: any): boolean {
  return is_false(to_boolean(value))
}

/**
 * test a value not falsy
 * @param value value
 */
export function is_truthy(value: any): boolean {
  return is_true(to_boolean(value))
}


/**
 * assert bool is true
 * @param bool boolean
 * @throws
 */
export function assert_true(bool: boolean): asserts bool is true {
  if(!is_true(bool)) throw new Error('bool not true')
}

/**
 * assert bool is false
 * @param bool boolean
 * @throws
 */
export function assert_false(bool: boolean): asserts bool is false {
  if(!is_false(bool)) throw new Error('bool not false')
}

/**
 * assert value is truthy
 * @param value value
 * @throws
 */
export function assert_truthy(value: any): asserts value is true {
  if(!is_truthy(value)) throw new Error('value not truthy')
}

/**
 * assert value is falsy
 * @param value value
 * @throws
 */
export function assert_falsy(value: any): asserts value is false {
  if(!is_falsy(value)) throw new Error('value not falsy')
}
