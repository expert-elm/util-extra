import toLocalString, { DateFormat } from './toLocalString'

const DATE: Date = new Date(0)

test(`should transform to datetime string`, () => {
  expect(toLocalString(DATE)).toBe(`1970-01-01 08:00:00`)
})

test(`should transform to date string`, () => {
  expect(toLocalString(DATE, DateFormat.Date)).toBe(`1970-01-01`)
})

test(`should transform to time string`, () => {
  expect(toLocalString(DATE, DateFormat.Time)).toBe(`08:00:00`)
})

test(`should throw error when type was invalide`, () => {
  expect(() => toLocalString(DATE, 42)).toThrow()
})
