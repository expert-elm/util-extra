import getHoursDiff from './getHoursDiff'

test(`getHoursDiff()`, () => {
  expect(
    getHoursDiff(new Date(`1970-01-01T23:00:00Z`), new Date(0))
  ).toBe(
    23
  )
})
