import { splitSlice, SplitStrategy } from './array'

test(`should split by offsets`, () => {
  expect(splitSlice('foobar'.split(``), [3])).toEqual(['foo', 'bar'])
  expect(splitSlice('foobarbaz'.split(``), [3, 3])).toEqual(['foo', 'bar', 'baz'])
})

test(`should split by indexes`, () => {
  expect(splitSlice('foobar'.split(``), [2], SplitStrategy.Index)).toEqual(['foo', 'bar'])
  expect(splitSlice('foobarbaz'.split(``), [2, 2 + 3], SplitStrategy.Index)).toEqual(['foo', 'bar', 'baz'])
})
