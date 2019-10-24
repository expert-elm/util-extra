import {
  isEven,
  isOdd,
  assertNaN,
  assertInfinity,
  assertNaNAndInfinity
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

describe('assert', () => {
  test('NaN', () => {
    expect(() => assertNaN(NaN)).toThrow()
    expect(() => assertNaN(42)).not.toThrow()
  })

  test('Infinity', () => {
    expect(() => assertInfinity(Infinity)).toThrow()
    expect(() => assertInfinity(42)).not.toThrow()
  })

  test('NaN or Infinity', () => {
    expect(() => assertNaNAndInfinity(NaN)).toThrow()
    expect(() => assertNaNAndInfinity(Infinity)).toThrow()
    expect(() => assertNaNAndInfinity(42)).not.toThrow()
  })
})
