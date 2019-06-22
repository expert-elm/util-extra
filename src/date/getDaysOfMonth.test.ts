import getDaysOfMonth from './getDaysOfMonth'

test(`getDaysOfMonth()`, () => {
  expect(
    getDaysOfMonth(new Date(0))
  ).toBe(
    31
  )
})

test(`getDaysOfMonth() leap years`, () => {
  expect(
    getDaysOfMonth(new Date(`1970-02`))
  ).toBe(
    28
  )
  expect(
    getDaysOfMonth(new Date(`2000-02`))
  ).toBe(
    29
  )
})
