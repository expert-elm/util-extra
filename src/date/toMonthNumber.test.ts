import toMonthNumber from './toMonthNumber'
import { makeInvalidMonthError } from './makeError'

test(`toMonthNumber()`, () => {
  expect(
    toMonthNumber(new Date(`1970-01`))
  ).toBe(
    `1`
  )
})

test(`toMonthNumber() pad zero`, () => {
  expect(
    toMonthNumber(new Date(`1970-01`), true)
  ).toBe(
    `01`
  )
})

test(`toMonthNumber() throw`, () => {
  expect(
    () => toMonthNumber(new Date(`foo`))
  ).toThrowError(
    makeInvalidMonthError(NaN)
  )
})
