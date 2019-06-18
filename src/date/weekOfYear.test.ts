import weekOfYear from './weekOfYear'

test(`weekOfYear()`, () => {
  expect(
    weekOfYear(new Date(`1970-01-03`))
  ).toBe(
    1
  )

  expect(
    weekOfYear(new Date(`1970-12-31`))
  ).toBe(
    53
  )
})

test(`weekOfYear() throw`, () => {
  expect(
    () => weekOfYear(new Date(`foo`))
  ).toThrow()
})
