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

/**
 * assert never used for switch match case, this one should never matched
 * @param value value
 */
export function assertNever(value: never): never {
  throw new Error('Unexpected object: ' + value)
}
