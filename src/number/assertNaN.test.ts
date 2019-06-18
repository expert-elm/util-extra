import assertNaN, { NAN_ERROR } from './assertNaN'

test(`assertNaN()`, () => {
  expect(
    () => assertNaN(NaN)
  ).toThrowError(
    NAN_ERROR.message
  )
})

test(`assertNaN() pass`, () => {
  expect(
    () => assertNaN(42)
  ).not.toThrow()
})
