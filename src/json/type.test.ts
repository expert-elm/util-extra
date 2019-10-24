import {
  isJsonNullType,
  isJsonStringType,
  isJsonNumberType,
  isJsonBooleanType,
  isJsonArrayType,
  isJsonObjectType,
  assertJsonArrayType,
  assertJsonObjectType,
  assertJsonStringType,
  assertJsonBooleanType,
  assertJsonNumberType,
  ensureJsonArrayType,
  ensureJsonObjectType
} from './type'

describe('predicate functions', () => {
  test('null', () => {
    expect(isJsonNullType(null)).toBe(true)
    expect(isJsonNullType(42)).toBe(false)
  })

  test('string', () => {
    expect(isJsonStringType('')).toBe(true)
    expect(isJsonStringType(42)).toBe(false)
  })

  test('number', () => {
    expect(isJsonNumberType('')).toBe(false)
    expect(isJsonNumberType(42)).toBe(true)
  })

  test('boolean', () => {
    expect(isJsonBooleanType('')).toBe(false)
    expect(isJsonBooleanType(false)).toBe(true)
  })

  test('array', () => {
    expect(isJsonArrayType([])).toBe(true)
    expect(isJsonArrayType({})).toBe(false)
  })

  test('object', () => {
    expect(isJsonObjectType([])).toBe(false)
    expect(isJsonObjectType({})).toBe(true)
  })
})

describe('asserter', () => {
  test('array', () => {
    expect(() => assertJsonArrayType(42)).toThrow()
    expect(() => assertJsonArrayType([])).not.toThrow()
  })

  test('object', () => {
    expect(() => assertJsonObjectType(42)).toThrow()
    expect(() => assertJsonObjectType({})).not.toThrow()
  })

  test('string', () => {
    expect(() => assertJsonStringType(42)).toThrow()
    expect(() => assertJsonStringType('')).not.toThrow()
  })

  test('boolean', () => {
    expect(() => assertJsonBooleanType(42)).toThrow()
    expect(() => assertJsonBooleanType(false)).not.toThrow()
  })

  test('number', () => {
    expect(() => assertJsonNumberType(null)).toThrow()
    expect(() => assertJsonNumberType(42)).not.toThrow()
  })
})

describe('ensure value', () => {
  test('array', () => {
    expect(ensureJsonArrayType(42)).toStrictEqual([])
    expect(ensureJsonArrayType([42])).toStrictEqual([42])
  })

  test('object', () => {
    expect(ensureJsonObjectType(42)).toStrictEqual({})
    expect(ensureJsonObjectType({ foo: 42 })).toStrictEqual({ foo: 42 })
  })
})
