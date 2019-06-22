import isLeapYear from './isLeapYear'

test(`isLeapYear()`, () => {
  expect(
    isLeapYear(new Date(`2000`))
  ).toBe(
    true
  )
  expect(
    isLeapYear(new Date(0))
  ).toBe(
    false
  )
})

test(`isLeapYear() throw`, () => {
  expect(
    () => isLeapYear(new Date(`foo`))
  ).toThrow()
})
