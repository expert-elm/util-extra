import getWeeksDiff from './getWeeksDiff'
import { WEEKS_OF_MONTH, WEEKS_OF_YEAR } from './constant'

test(`getWeeksDiff()`, () => {
  expect(
    getWeeksDiff(new Date(`1970-01-01`), new Date(`1970-02-01`))
  ).toBe(
    -WEEKS_OF_MONTH
  )
})

test(`getWeeksDiff() same month`, () => {
  expect(
    getWeeksDiff(new Date(`1970-01-01`), new Date(`1970-01-28`))
  ).toBe(
    -3
  )
})

test(`getWeeksDiff() over year`, () => {
  expect(
    getWeeksDiff(new Date(`2022-01-02T00:00:00Z`), new Date(`2023-01-01T00:00:00Z`))
  ).toBe(
    -WEEKS_OF_YEAR
  )
})
