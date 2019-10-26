import * as path from 'path'
import {
  toNumeralString,
  toPrependZero
} from './conversion'

const ns = path.basename(__dirname)

describe(ns + ' convert to string', () => {
  test('function ' + toNumeralString.name, () => {
    expect(toNumeralString(42)).toBe('42nd')
    expect(toNumeralString(0)).toBe('0th')
    expect(() => toNumeralString(Infinity)).toThrow()
  })

  test('function ' + toPrependZero.name, () => {
    expect(toPrependZero(42, 5)).toBe('00042')
    expect(toPrependZero(0, 1)).toBe('0')
    expect(() => toPrependZero(42, 0)).toThrow()
    expect(() => toPrependZero(42, 0, { overflow: false })).not.toThrow()
    expect(() => toPrependZero(Infinity, 0)).toThrow()
    expect(() => toPrependZero(0, Infinity)).toThrow()
  })
})
