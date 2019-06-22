import getMinutesDiff from './getMinutesDiff'

test(`getMinutesDiff()`, () => {
  expect(
    getMinutesDiff(new Date(`1970-01-01T00:42:00Z`), new Date(0))
  ).toBe(
    42
  )
})
