export function is_undefined(value: unknown): value is undefined {
  return undefined === value  
}

export function assert_undefined(value: unknown): asserts value is undefined {
  if(!is_undefined(value)) throw new Error(`Uncaught AssertionError: ${value} == undefined`)
}
