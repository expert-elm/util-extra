import toWeekDay, { WeekDay, WeekDayName, Format } from './toWeekDay'

test(`toWeekDay()`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`))
  ).toBe(
    WeekDayName[WeekDay.Thursday][0]
  )
})

test(`toWeekDay() short`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`), Format.Short)
  ).toBe(
    WeekDayName[WeekDay.Thursday][1]
  )
})

test(`toWeekDay() shorter`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`), Format.Shorter)
  ).toBe(
    WeekDayName[WeekDay.Thursday][2]
  )
})

test(`toWeekDay() error`, () => {
  expect(
    () => toWeekDay(new Date(`foo`))
  ).toThrowError(
    `Invalid weekday value "NaN", should between 0 and 6`
  )
})
