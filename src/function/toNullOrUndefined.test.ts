import toNullOrUndefined, { toNull, toUndefined } from './toNullOrUndefined'

test(`toNullOrUndefiend() toNull() toUndefiend(), called`, () => {
  const fn: jest.Mock<void> = jest.fn()
  toNullOrUndefined(fn)
  expect(fn).toHaveBeenCalled()
  toNull(fn)
  expect(fn).toHaveBeenCalled()
  toUndefined(fn)
  expect(fn).toHaveBeenCalled()
})

test(`toNullOrUndefined() toNull() toUndefined(), return value`, () => {
  const fn: jest.Mock<number> = jest.fn(() => 42)
  expect(toNullOrUndefined(fn)).toBe(42)
  expect(toNull(fn)).toBe(42)
  expect(toUndefined(fn)).toBe(42)
})

test(`toNullOrUndefined() toNull() toUndefined(), null`, () => {
  const fn: jest.Mock<void> = jest.fn(() => { throw 42 })
  expect(toNullOrUndefined(fn, null)).toBe(null)
  expect(toNull(fn)).toBe(null)
})

test(`toNullOrUndefined() toNull() toUndefined(), undefined`, () => {
  const fn: jest.Mock<void> = jest.fn(() => { throw 42 })
  expect(toNullOrUndefined(fn)).toBe(undefined)
  expect(toNullOrUndefined(fn, undefined)).toBe(undefined)
  expect(toUndefined(fn)).toBe(undefined)
})
