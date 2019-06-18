import toMonthNumber from './toMonthNumber'
import { makeInvalidMonthError } from './makeError'
import { Formatter } from './formatDateNumber'

test(`toMonthNumber()`, () => {
  expect(
    toMonthNumber(new Date(`1970-01`))
  ).toBe(
    `1`
  )
})

test(`toMonthNumber() pad zero`, () => {
  expect(
    toMonthNumber(new Date(`1970-01`), Formatter.PadZero)
  ).toBe(
    `01`
  )
})

test(`toMonthNumber() pad zero`, () => {
  expect(
    toMonthNumber(new Date(`1970-01`), Formatter.Numeral)
  ).toBe(
    `1st`
  )
})

test(`toMonthNumber() throw`, () => {
  expect(
    () => toMonthNumber(new Date(`foo`))
  ).toThrowError(
    makeInvalidMonthError(NaN)
  )
})
