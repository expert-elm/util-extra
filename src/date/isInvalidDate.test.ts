import isInvalidDate from './isInvalidDate'

test(`should be true`, () => {
  expect(isInvalidDate(new Date('foo'))).toBe(true)
})

test(`should be false`, () => {
  expect(isInvalidDate(new Date())).toBe(false)
})
