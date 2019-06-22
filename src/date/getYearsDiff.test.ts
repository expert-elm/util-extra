import getYearsDiff from './getYearsDiff'

test(`getYearsDiff()`, () => {
  expect(
    getYearsDiff(new Date(`1970-01-01`), new Date(`1971-02-01`))
  ).toBe(
    -1
  )
})
