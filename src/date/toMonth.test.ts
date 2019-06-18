import toMonth, { Month, MonthName, MonthShortName } from './toMonth'

test(`toMonth()`, () => {
  expect(
    toMonth(new Date(`1970-01-01`))
  ).toBe(
    MonthName[Month.January]
  )
})

test(`toMonth() short`, () => {
  expect(
    toMonth(new Date(`1970-01-01`), true)
  ).toBe(
    MonthShortName[Month.January]
  )
})

test(`toMonth() error`, () => {
  expect(
    () => toMonth(new Date(`foo`))
  ).toThrowError(`Invalid month value "NaN", should between 0 and 11`)
})

