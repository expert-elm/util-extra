import * as path from 'path'
import {
  inc,
  dec,
  divint,
  getInteger
} from './calculation'

const ns = path.basename(__dirname)

describe(ns + ' calc', () => {
  test('function ' + inc.name, () => {
    expect(inc(1)).toBe(2)
    expect(() => inc(NaN)).toThrow()
  })

  test('function ' + dec.name, () => {
    expect(dec(1)).toBe(0)
    expect(() => dec(NaN)).toThrow()
  })

  test('function ' + divint.name, () => {
    expect(divint(3, 2)).toBe(1)
    expect(() => divint(NaN, NaN)).toThrow()
    expect(() => divint(3, 0)).toThrow()
    expect(divint(3, 0, { zero: true })).toBe(0)
    expect(() => divint(3, Infinity)).toThrow()
    expect(divint(3, Infinity, { infinity: true })).toBe(0)
  })
})

describe(ns + ' getter', () => {
  test('function ' + getInteger.name, () => {
    expect(getInteger(42)).toBe(42)
    expect(getInteger(42.42)).toBe(42)
    expect(getInteger(0.42)).toBe(0)
    expect(getInteger(.42)).toBe(0)
    expect(() => getInteger(NaN)).toThrow()
    expect(() => getInteger(Infinity)).toThrow()
  })
})
