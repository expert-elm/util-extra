import formatDateNumber, { Formatter, makeUnknownFormatterError } from './formatDateNumber'

test(`formatDateNumber()`, () => {
  expect(
    formatDateNumber(42)
  ).toBe(
    `42`
  )
})

test(`formatDateNumber() pad zero`, () => {
  expect(
    formatDateNumber(1, Formatter.PadZero)
  ).toBe(
    `01`
  )
})

test(`formatDateNumber() numeral`, () => {
  expect(
    formatDateNumber(42, Formatter.Numeral)
  ).toBe(
    `42nd`
  )
})

test(`formatDateNumber() function`, () => {
  expect(
    formatDateNumber(42, () => `foo`)
  ).toBe(
    `foo`
  )
})

test(`toMonthNumber() throw`, () => {
  expect(
    () => formatDateNumber(42, 42)
  ).toThrowError(
    makeUnknownFormatterError(42)
  )
})
