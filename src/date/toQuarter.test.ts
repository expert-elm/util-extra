import toQuarter from './toQuarter'
import { Formatter } from './formatDateNumber'

test(`toQuarter()`, () => {
  expect(
    toQuarter(new Date(`1970-01-01`))
  ).toBe(
    `1`
  )
})

test(`toQuarter() format pad zero`, () => {
  expect(
    toQuarter(new Date(`1970-01-01`), Formatter.PadZero)
  ).toBe(
    `01`
  )
})

test(`toQuarter() format numeral`, () => {
  expect(
    toQuarter(new Date(`1970-01-01`), Formatter.Numeral)
  ).toBe(
    `1st`
  )
})

test(`toQuarter() error`, () => {
  expect(
    () => toQuarter(new Date(`foo`))
  ).toThrow()
})
