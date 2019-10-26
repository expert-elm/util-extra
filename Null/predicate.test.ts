import * as path from 'path'
import {
  isUndefined,
  isNull,
  isNil
} from './predicate'

const ns = path.basename(__dirname)

describe(ns + ' predicate', () => {
  test('function ' + isUndefined.name, () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(42)).toBe(false)
  })

  test('function ' + isNull.name, () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(42)).toBe(false)
  })

  test('function ' + isNil.name, () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
  })
})
