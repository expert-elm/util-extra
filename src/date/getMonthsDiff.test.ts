import getMonthsDiff from './getMonthsDiff'
import { MONTHS_OF_YEAR } from './constant'

test(`getMonthsDiff()`, () => {
  expect(
    getMonthsDiff(new Date(`1970-01-01`), new Date(`1970-02-01`))
  ).toBe(
    -1
  )
})

test(`getMonthsDiff() same month`, () => {
  expect(
    getMonthsDiff(new Date(`1970-01-01`), new Date(`1970-01-28`))
  ).toBe(
    0
  )
})

test(`getMonthsDiff() over year`, () => {
  expect(
    getMonthsDiff(new Date(`1970-01-01`), new Date(`1971-01-01`))
  ).toBe(
    -MONTHS_OF_YEAR
  )
})
