import toMidday, { Midday } from './toMidday'

test(`toMidday()`, () => {
  expect(
    toMidday(new Date(`1970-01-01`))
  ).toBe(
    Midday.AM
  )
})

test(`toMidday() short`, () => {
  expect(
    toMidday(new Date(`1970-01-01T20:00`), true)
  ).toBe(
    Midday.PM.toLowerCase()
  )
})

test(`toMidday() error`, () => {
  expect(
    () => toMidday(new Date(`foo`))
  ).toThrowError(
    `Invalid hours value "NaN", should between 0 and 23`
  )
})
