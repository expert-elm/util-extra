import unquote from './unquote'

test(`should unwrap quote`, () => {
  expect(
    unquote(`'foo'`)
  ).toBe(
    `foo`
  )
  expect(
    unquote(`"bar"`)
  ).toBe(
    `bar`
  )
  expect(
    unquote('`baz`')
  ).toBe(
    `baz`
  )
})

test(`should return origin string`, () => {
  expect(
    unquote('foo')
  ).toBe(
    'foo'
  )
  expect(
    unquote(`'bar`)
  ).toBe(
    `'bar`
  )
  expect(
    unquote(`'baz"`)
  ).toBe(
    `'baz"`
  )
  expect(
    unquote(`'"`)
  ).toBe(
    `'"`
  )
  expect(
    unquote(`'`)
  ).toBe(
    `'`
  )
})
