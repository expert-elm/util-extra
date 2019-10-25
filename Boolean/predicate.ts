import { toBoolean } from './conversion'

//#region predicate

/**
 * test a value was boolean type
 * @param value value
 */
export function isBoolean(value: any): value is boolean {
  return 'boolean' === typeof value || '[object Boolean]' === toString.call(value)
}

/**
 * test a boolean was true
 * @param bool boolean
 */
export function isTrue(bool: boolean): bool is true {
  return true === bool
}

/**
 * test a boolean was false
 * @param bool boolean
 */
export function isFalse(bool: boolean): bool is false {
  return false === bool
}

/**
 * test a value was not `0`, `-0`, `false`, `null`, `undefined`, `NaN`, `""`
 * @param value value
 */
export function isFalsy(value: any): boolean {
  return isFalse(toBoolean(value))
}

/**
 * test a value not falsy
 * @param value value
 */
export function isTruthy(value: any): boolean {
  return isTrue(toBoolean(value))
}


//#endregion


//#region assertion

/**
 * assert bool is true
 * @param bool boolean
 * @throws
 */
export function assertTrue(bool: boolean): asserts bool is true {
  if(!isTrue(bool)) throw new Error('bool not true')
}

/**
 * assert bool is false
 * @param bool boolean
 * @throws
 */
export function assertFalse(bool: boolean): asserts bool is false {
  if(!isFalse(bool)) throw new Error('bool not false')
}

/**
 * assert value is truthy
 * @param value value
 * @throws
 */
export function assertTruthy(value: any): asserts value is true {
  if(!isTruthy(value)) throw new Error('value not truthy')
}

/**
 * assert value is falsy
 * @param value value
 * @throws
 */
export function assertFalsy(value: any): asserts value is false {
  if(!isFalsy(value)) throw new Error('value not falsy')
}

//#endregion
