import {
  is_function
} from './function'

describe(is_function, () => {
  test('is function', () => {
    expect(is_function(() => {})).toBe(true)
    expect(is_function(Function)).toBe(true)
    expect(is_function(function() {})).toBe(true)
    expect(is_function(function*() {})).toBe(true)
    expect(is_function(class {})).toBe(true)
  })
  test('is not function', () => {
    expect(is_function(42)).toBe(false)
  })
})
