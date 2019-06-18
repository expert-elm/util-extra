import dayOfYear from './dayOfYear'

test(`dayOfYear()`, () => {
  expect(
    dayOfYear(new Date(`1970-01-03`))
  ).toBe(
    3
  )
})

test(`dayOfYear() throw`, () => {
  expect(
    () => dayOfYear(new Date(`foo`))
  ).toThrow()
})
