import getWeeksOfYear from './getWeeksOfYear'

test(`getWeeksOfYear()`, () => {
  expect(
    getWeeksOfYear(new Date(`1970-01-03`))
  ).toBe(
    1
  )

  expect(
    getWeeksOfYear(new Date(`1970-12-31`))
  ).toBe(
    53
  )
})

test(`getWeeksOfYear() throw invalid date`, () => {
  expect(
    () => getWeeksOfYear(new Date(`foo`))
  ).toThrow()
})
