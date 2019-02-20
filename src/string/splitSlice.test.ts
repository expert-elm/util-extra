import splitSlice, { SplitStrategy } from './splitSlice'

test(`should split by offsets`, () => {
  expect(splitSlice('foobar', [3])).toEqual(['foo', 'bar'])
  expect(splitSlice('foobarbaz', [3, 3])).toEqual(['foo', 'bar', 'baz'])
})

test(`should split by indexes`, () => {
  expect(splitSlice('foobar', [2], SplitStrategy.Index)).toEqual(['foo', 'bar'])
  expect(splitSlice('foobarbaz', [2, 2 + 3], SplitStrategy.Index)).toEqual(['foo', 'bar', 'baz'])
})
