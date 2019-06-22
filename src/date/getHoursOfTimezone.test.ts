import getHoursOfTimezone from './getHoursOfTimezone'

test.skip(`getHoursOfTimezone()`, () => {
  expect(
    getHoursOfTimezone(new Date())
  ).toBe(
    8
  )
})
