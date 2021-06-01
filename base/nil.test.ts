import {
  is_nil
} from './nil'

describe(is_nil, () => {
  test('nil', () => {
    expect(is_nil(null)).toBe(true)
    expect(is_nil(undefined)).toBe(true)
  })
  test('not nil', () => {
    expect(is_nil(0)).toBe(false)
  })
})
