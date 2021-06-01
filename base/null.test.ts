import {
  is_null
} from './null'

describe(is_null, () => {
  test('null', () => {
    expect(is_null(null)).toBe(true)
  })
  test('not null', () => {
    expect(is_null(undefined)).toBe(false)
  })
})
