import {
  inc,
  dec,
  divint
} from './compute'

describe('inc and dec', () => {
  test('inc', () => {
    expect(inc(1)).toBe(2)
    expect(() => inc(NaN)).toThrow()
  })

  test('dec', () => {
    expect(dec(1)).toBe(0)
    expect(() => dec(NaN)).toThrow()
  })
})

describe('divint', () => {
  test('.', () => {
    expect(divint(3, 2)).toBe(1)
  })

  test('NaN', () => {
    expect(() => divint(NaN, NaN)).toThrow()
  })

  test('0 or Infinity', () => {
    expect(() => divint(3, 0)).toThrow()
    expect(divint(3, 0, { zero: true })).toBe(0)
    expect(() => divint(3, Infinity)).toThrow()
    expect(divint(3, Infinity, { infinity: true })).toBe(0)
  })
})
