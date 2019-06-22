import toYear from './toYear'

test(`toYear()`, () => {
  expect(
    toYear(new Date(0))
  ).toBe(
    `1970`
  )
})

test(`toYear() short`, () => {
  expect(
    toYear(new Date(0), true)
  ).toBe(
    `70`
  )
})

test(`toYear() throw`, () => {
  expect(
    () => toYear(new Date(`foo`))
  ).toThrow()
})
