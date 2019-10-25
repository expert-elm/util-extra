import * as path from 'path'
import {
  isNumber,
  isInteger,
  hasDecimal,
  isNaN,
  isInfinity,
  isZero,
  isEven,
  isOdd,
  assertNonNaN,
  assertNonInfinity,
  assertInteger,
  assertNonZero,
  assertPositiveInteger,
  assertNonNegativeInteger,
  isNonNegativeInteger
} from './predicate'

const ns = path.basename(path.dirname(__filename))

describe(ns + ' predicate', () => {
  test('function ' + isNumber.name, () => {
    expect(isNumber(42)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(Number())).toBe(true)
    expect(isNumber(new Number)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber({})).toBe(false)
  })

  test('function ' + isInteger.name, () => {
    expect(isInteger(42)).toBe(true)
    expect(isInteger(42.42)).toBe(false)
  })

  test('function ' + isNonNegativeInteger.name, () => {
    expect(isNonNegativeInteger(42)).toBe(true)
    expect(isNonNegativeInteger(0)).toBe(true)
    expect(isNonNegativeInteger(-0)).toBe(false)
    expect(isNonNegativeInteger(-Infinity)).toBe(false)
  })

  test('function ' + hasDecimal.name, () => {
    expect(hasDecimal(42)).toBe(false)
    expect(hasDecimal(42.42)).toBe(true)
  })

  test('function ' + isNaN.name, () => {
    expect(isNaN(NaN)).toBe(true)
    expect(isNaN(42)).toBe(false)
  })

  test('function ' + isInfinity.name, () => {
    expect(isInfinity(Infinity)).toBe(true)
    expect(isInfinity(-Infinity)).toBe(true)
    expect(isInfinity(42)).toBe(false)
  })

  test('function ' + isEven.name, () => {
    expect(isEven(1)).toBe(false)
    expect(isEven(2)).toBe(true)
  })

  test('function ' + isOdd.name, () => {
    expect(isOdd(1)).toBe(true)
    expect(isOdd(2)).toBe(false)
  })

  test('function ' + isZero.name, () => {
    expect(isZero(42)).toBe(false)
    expect(isZero(0)).toBe(true)
  })
})

describe(ns + ' assertion', () => {
  test('function ' + assertNonNaN.name, () => {
    expect(() => assertNonNaN(NaN)).toThrow()
    expect(() => assertNonNaN(42)).not.toThrow()
  })

  test('function ' + assertNonInfinity.name, () => {
    expect(() => assertNonInfinity(Infinity)).toThrow()
    expect(() => assertNonInfinity(42)).not.toThrow()
  })

  test('function ' + assertInteger.name, () => {
    expect(() => assertInteger(42)).not.toThrow()
    expect(() => assertInteger(-42)).not.toThrow()
    expect(() => assertInteger(42.42)).toThrow()
    expect(() => assertInteger(-42.42)).toThrow()
    expect(() => assertInteger(0)).not.toThrow()
    expect(() => assertInteger(NaN)).toThrow()
    expect(() => assertInteger(Infinity)).toThrow()
  })

  test('function ' + assertPositiveInteger.name, () => {
    expect(() => assertPositiveInteger(42)).not.toThrow()
    expect(() => assertPositiveInteger(-42)).toThrow()
    expect(() => assertPositiveInteger(0)).toThrow()
    expect(() => assertPositiveInteger(NaN)).toThrow()
    expect(() => assertPositiveInteger(Infinity)).toThrow()
  })

  test('function ' + assertNonNegativeInteger.name, () => {
    expect(() => assertNonNegativeInteger(42)).not.toThrow()
    expect(() => assertNonNegativeInteger(-42)).toThrow()
    expect(() => assertNonNegativeInteger(0)).not.toThrow()
    expect(() => assertNonNegativeInteger(NaN)).toThrow()
    expect(() => assertNonNegativeInteger(Infinity)).toThrow()
  })

  test('function ' + assertNonZero.name, () => {
    expect(() => assertNonZero(42)).not.toThrow()
    expect(() => assertNonZero(0)).toThrow()
    expect(() => assertNonZero(-0)).toThrow()
  })
})
