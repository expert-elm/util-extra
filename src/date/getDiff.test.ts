import getTimestampDiff, { getDiff, makeUnknownUnitError } from './getDiff'
import { DAY_SECONDS } from './constant'

test(`getTimestampDiff()`, () => {
  expect(
    getTimestampDiff(new Date(0), new Date(42))
  ).toBe(
    -42
  )
  expect(
    getTimestampDiff(new Date(`1970-01-01`), new Date(`1970-01-02`))
  ).toBe(
    -DAY_SECONDS
  )
})

test(`getDiff() throw unknonw unit`, () => {
  expect(
    () => getDiff(42)
  ).toThrowError(
    makeUnknownUnitError(42)
  )
})
