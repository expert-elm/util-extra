import inc from './inc'
import { NAN_ERROR } from './validateNaN'

test(`should inc a number`, () => {
  expect(
    inc(42)
  ).toBe(
    43
  )
})

test(`shold throw when NaN`, () => {
  expect(
    () => inc(NaN)
  ).toThrowError(
    NAN_ERROR
  )
})
