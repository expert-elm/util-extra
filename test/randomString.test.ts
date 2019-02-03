import randomString from '../src/randomString'

test(`should generate random string`, () => {
  const result = randomString()
  expect(result).toBeTruthy()
  expect(result.length).toBe(6)
})

test(`should generate 10 string length`, () => {
  const result = randomString(8)
  expect(result.length).toBe(8)
})

test(`should throw when string length greater than 13`, () => {
  expect(() => randomString(24)).toThrow()
})
