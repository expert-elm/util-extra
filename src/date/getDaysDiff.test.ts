import getDaysDiff from './getDaysDiff'
import { DAYS_OF_YEAR, DAYS_OF_LEAPYEAR } from './constant'

test(`getDaysDiff`, () => {
  expect(
    getDaysDiff(new Date(`1970-01-01`), new Date(`1970-01-02`))
  ).toBe(
    -1
  )
  expect(
    getDaysDiff(new Date(`1970-01-01`), new Date(`1970-01-01`))
  ).toBe(
    0
  )
  expect(
    getDaysDiff(new Date(`1970-01-01`), new Date(`1969-01-01`))
  ).toBe(
    DAYS_OF_YEAR
  )
  expect(
    getDaysDiff(new Date(`2001-01-01`), new Date(`2000-01-01`))
  ).toBe(
    DAYS_OF_LEAPYEAR
  )
})
