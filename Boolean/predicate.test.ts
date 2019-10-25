import {
  isBoolean,
  isTrue,
  isFalse,
  isTruthy,
  isFalsy,
  assertTrue,
  assertFalse,
  assertTruthy,
  assertFalsy,
} from './predicate'

describe('predicate function', () => {
  test('function isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(Boolean())).toBe(true)
    expect(isBoolean(new Boolean)).toBe(true)
    expect(isBoolean(42)).toBe(false)
  })

  test('function isTrue', () => {
    expect(isTrue(true)).toBe(true)
    expect(isTrue(false)).toBe(false)
  })

  test('function isFalse', () => {
    expect(isFalse(true)).toBe(false)
    expect(isFalse(false)).toBe(true)
  })

  test('function isTruthy', () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy(42)).toBe(true)
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy(NaN)).toBe(false)
    expect(isTruthy(null)).toBe(false)
  })

  test('function isFalsy', () => {
    expect(isFalsy(true)).toBe(false)
    expect(isFalsy(42)).toBe(false)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy(NaN)).toBe(true)
    expect(isFalsy(null)).toBe(true)
  })
})

describe('assertion', () => {
  test('function assertTure', () => {
    expect(() => assertTrue(false)).toThrow()
    expect(() => assertTrue(true)).not.toThrow()
  })

  test('function assertFalse', () => {
    expect(() => assertFalse(false)).not.toThrow()
    expect(() => assertFalse(true)).toThrow()
  })

  test('function assertTurthy', () => {
    expect(() => assertTruthy(false)).toThrow()
    expect(() => assertTruthy(0)).toThrow()
    expect(() => assertTruthy(undefined)).toThrow()
    expect(() => assertTruthy(true)).not.toThrow()
    expect(() => assertTruthy(42)).not.toThrow()
  })

  test('function assertFalsy', () => {
    expect(() => assertFalsy(false)).not.toThrow()
    expect(() => assertFalsy(0)).not.toThrow()
    expect(() => assertFalsy(undefined)).not.toThrow()
    expect(() => assertFalsy(true)).toThrow()
    expect(() => assertFalsy(42)).toThrow()
  })
})
