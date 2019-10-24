import {
  isEven,
  isOdd,
  assertNaN
} from './predicate'

describe('even & odd', () => {
  test('even', () => {
    expect(isEven(1)).toBe(false)
    expect(isEven(2)).toBe(true)
  })

  test('odd', () => {
    expect(isOdd(1)).toBe(true)
    expect(isOdd(2)).toBe(false)
  })
})

describe('NaN', () => {
  test('assert NaN', () => {
    expect(() => assertNaN(NaN)).toThrow()
    expect(() => assertNaN(42)).not.toThrow()
  })
})
