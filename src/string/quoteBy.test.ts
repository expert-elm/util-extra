import quoteBy from './quoteBy'
import { Pair } from './pair'

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
