import getSecondsDiff from './getSecondsDiff'

test(`getSecondsDiff()`, () => {
  expect(
    getSecondsDiff(new Date(`1970-01-01T00:00:42Z`), new Date(0))
  ).toBe(
    42
  )
})
