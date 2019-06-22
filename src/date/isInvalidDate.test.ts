import isInvalidDate from './isInvalidDate'

test(`isInvalidDate() true`, () => {
  expect(
    isInvalidDate(new Date(`foo`))
  ).toBe(
    true
  )
})

test(`isInvalidDate() false`, () => {
  expect(
    isInvalidDate(new Date())
  ).toBe(
    false
  )
})
