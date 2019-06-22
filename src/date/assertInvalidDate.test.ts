import assertInvalidDate from './assertInvalidDate'

test(`assertInvalidDate()`, () => {
  expect(
    () => assertInvalidDate(new Date(`foo`))
  ).toThrowError(
    `Invalid Date`
  )
})

test(`assertInvalidDate() pass`, () => {
  expect(
    assertInvalidDate(new Date(42))
  ).toBe(
    undefined
  )
})
