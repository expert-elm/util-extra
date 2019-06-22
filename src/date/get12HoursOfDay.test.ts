import get12HoursOfDay from './get12HoursOfDay'
import { Midday } from './toMidday'

test(`get12HoursOfDay()`, () => {
  expect(
    get12HoursOfDay(new Date(`1970-01-01T23:59`))
  ).toEqual(
    [11, Midday.PM]
  )
  expect(
    get12HoursOfDay(new Date(`1970-01-01T00:00`))
  ).toEqual(
    [0, Midday.AM]
  )
})

test(`get12HoursOfDay() throw invalid date`, () => {
  expect(
    () => get12HoursOfDay(new Date(`foo`))
  ).toThrow()
})
