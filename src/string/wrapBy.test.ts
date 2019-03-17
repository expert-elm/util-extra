import wrapBy, { Pair } from './wrapBy'

test(`should wrap chars`, () => {
  expect(
    wrapBy(`foo`, '""')
  ).toBe(
    `"foo"`
  )
  expect(
    wrapBy(`foo`, Pair.Parenthesis)
  ).toBe(
    `(foo)`
  )
  expect(
    wrapBy(`foo`, ['<div>', '</div>'])
  ).toBe(
    `<div>foo</div>`
  )
})

test(`should wrap by char`, () => {
  expect(
    wrapBy(`foo`, '"')
  ).toBe(
    `"foo"`
  )
  expect(
    wrapBy(`foo`, '(')
  ).toBe(
    `(foo(`
  )
  expect(
    wrapBy(`foo`, '')
  ).toBe(
    `foo`
  )
})
