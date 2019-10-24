import {
  isUndefined,
  isNull,
  isNil,
  isNumber,
  isZero,
  isString,
  isBlankString,
  isBoolean,
  isTrue,
  isFalse,
  isTruthy,
  isFalsy,
  isFunction,
  isArray,
  isEmptyArray,
  isObject
} from './primitive'

describe('undefined & null', () => {
  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(42)).toBe(false)
  })

  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(42)).toBe(false)
  })

  test('isNil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(42)).toBe(false)
  })
})

describe('number & string & boolean', () => {
  test('isNumber', () => {
    expect(isNumber(42)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber('foo')).toBe(false)
  })

  test('isNaN', () => {
    expect(isNaN(42)).toBe(false)
    expect(isNaN(NaN)).toBe(true)
  })

  test('isZero', () => {
    expect(isZero(0)).toBe(true)
    expect(isZero(NaN)).toBe(false)
  })

  test('isString', () => {
    expect(isString('foo')).toBe(true)
    expect(isString(42)).toBe(false)
  })

  test('isBlankString', () => {
    expect(isBlankString('foo')).toBe(false)
    expect(isBlankString('')).toBe(true)
  })

  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(42)).toBe(false)
  })

  test('isTrue', () => {
    expect(isTrue(true)).toBe(true)
    expect(isTrue(false)).toBe(false)
    expect(isTrue(42)).toBe(false)
  })

  test('isFalse', () => {
    expect(isFalse(true)).toBe(false)
    expect(isFalse(false)).toBe(true)
    expect(isFalse(42)).toBe(false)
  })

  test('isFalsy', () => {
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy(false)).toBe(true)
    expect(isFalsy(null)).toBe(true)
    expect(isFalsy(undefined)).toBe(true)
    expect(isFalsy('')).toBe(true)
  })

  test('isTruthy', () => {
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy(false)).toBe(false)
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy(undefined)).toBe(false)
    expect(isTruthy('')).toBe(false)
  })
})

describe('function & array & object', () => {
  test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(42)).toBe(false)
  })

  test('isArray', () => {
    expect(isArray(42)).toBe(false)
    expect(isArray([])).toBe(true)
  })

  test('isEmptyArray', () => {
    expect(isEmptyArray(42)).toBe(false)
    expect(isEmptyArray([])).toBe(true)
    expect(isEmptyArray([42])).toBe(false)
  })

  test('isObject', () => {
    expect(isObject(42)).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
  })
})
