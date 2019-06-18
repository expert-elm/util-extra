import dec from './dec'
import { NAN_ERROR } from './assertNaN'

test(`should inc a number`, () => {
  expect(
    dec(42)
  ).toBe(
    41
  )
})

test(`shold throw when NaN`, () => {
  expect(
    () => dec(NaN)
  ).toThrowError(
    NAN_ERROR
  )
})
