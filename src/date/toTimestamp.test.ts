import toTimestamp from './toTimestamp'

const RECEIVED: number = +new Date('2000')

test(`should convert date object to timestamp`, () => {
  expect(toTimestamp(new Date(0))).toBe(0)
  expect(toTimestamp(new Date('2000'))).toBe(RECEIVED)
})

test(`should convert string to timestamp`, () => {
  expect(toTimestamp('1970')).toBe(0)
  expect(toTimestamp('2000')).toBe(RECEIVED)
})

test(`should convert number to timestamp`, () => {
  expect(toTimestamp(0)).toBe(0)
  expect(toTimestamp(RECEIVED)).toBe(RECEIVED)
})
