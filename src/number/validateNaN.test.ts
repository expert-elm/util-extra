import validateNaN, { NAN_ERROR } from './validateNaN'

test(`should throw when NaN`, () => {
  expect(
    () => validateNaN(NaN)
  ).toThrowError(
    NAN_ERROR
  )
})

test(`should be void when not NaN`, () => {
  expect(
    validateNaN(42)
  ).toBe(
    void 0
  )
})
