import sleep from './sleep'
import timeout, { TIMEOUT_ERROR } from './timeout'

test(`should timeout and throw`, () => {
  expect(
    timeout(100, () => sleep(200))
  ).rejects.toThrowError(
    TIMEOUT_ERROR
  )
})

test(`should not timeout`, () => {
  const fn: jest.Mock<void> = jest.fn()
  timeout(100, fn)
  expect(
    fn
  ).toHaveBeenCalled()
})

test(`should not timeout with 0 ms`, () => {
  const fn: jest.Mock<void> = jest.fn()
  timeout(0, fn)
  expect(
    fn
  ).toHaveBeenCalled()
})
