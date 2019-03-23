import isOdd from './isOdd'

test(`should be odd`, () => {
  expect(
    isOdd(1)
  ).toBe(
    true
  )
})

test(`should not be odd`, () => {
  expect(
    isOdd(2)
  ).toBe(
    false
  )
})
