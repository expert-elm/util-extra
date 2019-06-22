import toNumeral from './toNumeral'

test(`toNumeral()`, () => {
  expect(
    toNumeral(42)
  ).toBe(
    `42nd`
  )
})

test(`toNumeral() throw`, () => {
  expect(
    () => toNumeral(NaN)
  ).toThrow()
})
