import getDaysOfYear from './getDaysOfYear'

test(`getDaysOfYear()`, () => {
  expect(
    getDaysOfYear(new Date(`1970-01-03`))
  ).toBe(
    3
  )
})

test(`getDaysOfYear() throw invalid date`, () => {
  expect(
    () => getDaysOfYear(new Date(`foo`))
  ).toThrow()
})
