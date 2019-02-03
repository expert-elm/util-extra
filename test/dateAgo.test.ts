import ago, { DEFAULT_JUSTNOW_TEMPLATE } from '../src/dateAgo'

test('should compute date ago', () => {
  expect(ago(new Date())).toBe(DEFAULT_JUSTNOW_TEMPLATE)
})

test('should compute with two date', () => {
  expect(ago('1999', '2000')).toBe('a year ago')
})

test('should format description', () => {
  expect(ago('1999', '2001')).toBe('2 years ago')
})

test('should apply template', () => {
  expect(ago('1990', '2000', '$1 $2 foo')).toBe('10 years foo')
})

test('should apply justnow template', () => {
  expect(ago(new Date(), undefined, undefined, 'bar')).toBe('bar')
})
