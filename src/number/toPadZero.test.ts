import toPadZero, { OVERFLOW_ERROR } from './toPadZero'

test(`toPadZero()`, () => {
  expect(
    toPadZero(2, 2)
  ).toBe(
    `02`
  )
})

test(`toPadZero() throw over size`, () => {
  expect(
    () => toPadZero(42, 1, true)
  ).toThrowError(
    OVERFLOW_ERROR
  )
})

test(`toPadZero() pass no throw`, () => {
  expect(
    () => toPadZero(42, 1, false)
  ).not.toThrowError(
    OVERFLOW_ERROR
  )
})

test(`toPadZero() throw NaN`, () => {
  expect(
    () => toPadZero(NaN, 2)
  ).toThrow()
})
