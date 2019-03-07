import divint, { DIVISION_BY_ZERO_OR_INFINITY_ERROR } from './divint'

test(`should get interger value`, () => {
  expect(
    divint(5, 3)
  ).toBe(
    1
  )
})

test(`should throw when dividend was zero`, () => {
  expect(
    () => divint(5, 0, false)
  ).toThrowError(
    DIVISION_BY_ZERO_OR_INFINITY_ERROR
  )
})
