import toQuarter, { Quarter, QuarterName, QuarterShortName } from './toQuarter'

test(`toQuarter()`, () => {
  expect(
    toQuarter(new Date(`1970-01-01`))
  ).toBe(
    QuarterName[Quarter.First]
  )
})

test(`toQuarter() short`, () => {
  expect(
    toQuarter(new Date(`1970-01-01`), true)
  ).toBe(
    QuarterShortName[Quarter.First]
  )
})

test(`toQuarter() error`, () => {
  expect(
    () => toQuarter(new Date(`foo`))
  ).toThrowError(
    `Invalid month value "NaN", should between 0 and 11`
  )
})
