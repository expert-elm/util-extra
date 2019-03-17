import ensureList from './ensureList'

test(`should be list`, () => {
  expect(
    ensureList('foo')
  ).toEqual(
    ['foo']
  )
  expect(
    ensureList(['foo'])
  ).toEqual(
    ['foo']
  )
})
