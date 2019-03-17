import unwrap, { Pair } from './unwrap'

test(`should unwrap`, () => {
  expect(
    unwrap(`'foo'`)
  ).toBe(
    `foo`
  )
  expect(
    unwrap(`'"foo"'`)
  ).toBe(
    `"foo"`
  )
  expect(
    unwrap(`(foo)`)
  ).toBe(
    `foo`
  )
  expect(
    unwrap(`'foo"`)
  ).toBe(
    `'foo"`
  )
  expect(
    unwrap(``)
  ).toBe(
    ``
  )
  expect(
    unwrap(`'`)
  ).toBe(
    `'`
  )
})

test(`should includes char pairs`, () => {
  expect(
    unwrap(`'foo'`, [])
  ).toBe(
    `'foo'`
  )
  expect(
    unwrap(`'foo'`, [ Pair.DoubleQuotes, Pair.BackQuotes ])
  ).toBe(
    `'foo'`
  )
  expect(
    unwrap(`'foo'`, [ Pair.SingleQuotes ])
  ).toBe(
    `foo`
  )
  expect(
    unwrap(`#foo#`, [ '##' ])
  ).toBe(
    `foo`
  )
})

test(`should includes as a predicate function`, () => {
  expect(
    unwrap(`#foo#`, (_, l, r) => l === '#' && r === '#')
  ).toBe(
    `foo`
  )
})
