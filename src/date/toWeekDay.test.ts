import toWeekDay, { WeekDay, WeekDayName, WeekDayShortName } from './toWeekDay'

test(`toWeekDay()`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`))
  ).toBe(
    WeekDayName[WeekDay.Thursday]
  )
})

test(`toWeekDay() short`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`), true)
  ).toBe(
    WeekDayShortName[WeekDay.Thursday]
  )
})

test(`toWeekDay() error`, () => {
  expect(
    () => toWeekDay(new Date(`foo`))
  ).toThrowError(
    `Invalid weekday value "NaN", should between 0 and 6`
  )
})
