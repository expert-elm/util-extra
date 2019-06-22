import format from './format'

test(`format()`, () => {
  expect(
    format(new Date(0), `YYYY-MM-DD`)
  ).toBe(
    `1970-01-01`
  )
})
