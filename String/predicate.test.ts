import * as path from 'path'
import {
  isString,
  isBlankString,
  assertNonBlankString
} from './predicate'

const ns = path.basename(path.dirname(__filename))

describe(ns + ' predicate', () => {
  test('function ' + isString.name, () => {
    expect(isString('')).toBe(true)
    expect(isString(42)).toBe(false)
    expect(isString(new String)).toBe(true)
    expect(isString(String())).toBe(true)
  })

  test('function ' + isBlankString.name, () => {
    expect(isBlankString('')).toBe(true)
    expect(isBlankString(``)).toBe(true)
    expect(isBlankString(` `)).toBe(false)
    expect(isBlankString(` `, { trim: true })).toBe(true)
  })
})

describe(ns + ' assertion', () => {
  test('function ' + assertNonBlankString.name, () => {
    expect(() => assertNonBlankString('')).toThrow()
    expect(() => assertNonBlankString(' ')).not.toThrow()
    expect(() => assertNonBlankString(' ', { trim: true })).toThrow()
  })
})
