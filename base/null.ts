export function is_null(value: unknown): value is null {
  return null === value
}

export function assert_null(value: unknown): asserts value is null {
  if(!is_null(value)) throw new Error(`Uncaught AssertionError: ${value} == null`)
}
