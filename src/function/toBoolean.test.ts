import toBoolean from './toBoolean'

test(`toBoolean(), called`, () => {
  const fn: jest.Mock<void> = jest.fn()
  toBoolean(fn)
  expect(fn).toHaveBeenCalled()
})

test(`toBoolean(), true`, () => {
  const fn: jest.Mock<void> = jest.fn()
  expect(toBoolean(fn)).toBe(true)
})

test(`toBoolean(), false`, () => {
  const fn: jest.Mock<void> = jest.fn(() => { throw 42 })
  expect(toBoolean(fn)).toBe(false)
})
