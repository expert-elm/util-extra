import isSameDay from './isSameDay'

test(`isSameDay()`, () => {
  expect(
    isSameDay(new Date(`1970-01-01T00:00`), new Date(`1970-01-01T23:59:59`))
  ).toBe(
    true
  )
  expect(
    isSameDay(new Date(`1970-01-01T00:00`), new Date(`1970-01-01T24:00:00`))
  ).toBe(
    false
  )
})
