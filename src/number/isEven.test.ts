import isEven from './isEven'

test(`should be even`, () => {
  expect(
    isEven(2)
  ).toBe(
    true
  )
})

test(`should not be even`, () => {
  expect(
    isEven(1)
  ).toBe(
    false
  )
})
