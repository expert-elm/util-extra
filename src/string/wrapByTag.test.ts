import wrapByTag from './wrapByTag'

test(`should wrap tag`, () => {
  expect(
    wrapByTag(`foo`)
  ).toBe(
    `<div>foo</div>`
  )
  expect(
    wrapByTag(`foo`, `em`)
  ).toBe(
    `<em>foo</em>`
  )
  expect(
    wrapByTag(`foo`, ``)
  ).toBe(
    `<>foo</>`
  )
})

test(`should wrap tag with attrs`, () => {
  expect(
    wrapByTag(`foo`, undefined, { id: `bar` })
  ).toBe(
    `<div id="bar">foo</div>`
  )
  expect(
    wrapByTag(`foo`, undefined, { id: `bar`, class: `baz` })
  ).toBe(
    `<div id="bar" class="baz">foo</div>`
  )
})
