import {
  toBoolean
} from './conversion'

describe('boolean conversion', () => {
  test('function toBoolean', () => {
    expect(toBoolean(42)).toBe(true)
    expect(toBoolean(0)).toBe(false)
  })
})
