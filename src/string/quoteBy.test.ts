import quoteBy, { Pair } from './quoteBy'

test(`should wrap quote`, () => {
  expect(
    quoteBy(`foo`)
  ).toBe(
    `"foo"`
  )
  expect(
    quoteBy(`foo`, Pair.SingleQuotes)
  ).toBe(
    `'foo'`
  )
})
