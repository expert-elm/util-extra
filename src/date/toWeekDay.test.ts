import toWeekDay, { WeekDay, WeekDayName, WeekFormat } from './toWeekDay'

test(`toWeekDay()`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`))
  ).toBe(
    WeekDayName[WeekDay.Thursday][0]
  )
})

test(`toWeekDay() short`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`), WeekFormat.Short)
  ).toBe(
    WeekDayName[WeekDay.Thursday][1]
  )
})

test(`toWeekDay() shorter`, () => {
  expect(
    toWeekDay(new Date(`1970-01-01`), WeekFormat.Shorter)
  ).toBe(
    WeekDayName[WeekDay.Thursday][2]
  )
})

test(`toWeekDay() error`, () => {
  expect(
    () => toWeekDay(new Date(`foo`))
  ).toThrow()
})
