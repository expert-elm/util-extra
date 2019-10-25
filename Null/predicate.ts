/**
 * test value is undefined
 * @param value value
 */
export function isUndefined(value: any): value is undefined {
  return undefined === value
}

/**
 * test value is null
 * @param value value
 */
export function isNull(value: any): value is null {
  return null === value
}

/**
 * test value is null or undefined
 * @param value value
 */
export function isNil(value: any): value is (null | undefined) {
  return isUndefined(value) || isNull(value)
}
