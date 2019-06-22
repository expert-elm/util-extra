import toTimezone, { Format } from './toTimezone'

test.skip(`toTimezone`, () => {
  expect(
    toTimezone(new Date(0))
  ).toBe(
    8
  )
  expect(
    toTimezone(new Date(0), Format.ISO8601)
  ).toBe(
    `+08:00`
  )

  expect(
    toTimezone(new Date(0), Format.RFC2822)
  ).toBe(
    `+0800`
  )
})
