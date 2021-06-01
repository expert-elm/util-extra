import {
  is_undefined  
} from './undefined'

describe(is_undefined, () => {
  test('undefined', () => {
    expect(is_undefined(undefined)).toBe(true)
  })
  test('not undefined', () => {
    expect(is_undefined(null)).toBe(false)
  })
})
