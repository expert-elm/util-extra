import toMonth, { Month, MonthName } from './toMonth'

test(`toMonth()`, () => {
  expect(
    toMonth(new Date(`1970-01-01`))
  ).toBe(
    MonthName[Month.January][0]
  )
})

test(`toMonth() short`, () => {
  expect(
    toMonth(new Date(`1970-01-01`), true)
  ).toBe(
    MonthName[Month.January][1]
  )
})

test(`toMonth() error`, () => {
  expect(
    () => toMonth(new Date(`foo`))
  ).toThrow()
})

