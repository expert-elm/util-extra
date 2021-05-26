/**
 * assert never used for switch match case, this one should never matched
 */
export function assert_never(value: never): never {
  throw new Error('Unexpected object: ' + value)
}
