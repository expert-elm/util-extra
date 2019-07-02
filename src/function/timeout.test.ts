import sleep from './sleep'
import timeout, { makeTimeoutError } from './timeout'

describe(`timeout(), resolved`, () => {
  test(`timeout() resolved`, () => {
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
})

describe(`timeout(), rejected`, () => {
  test(`timeout(), throw`, () => {
    return expect(
      timeout(100, () => sleep(200))
    ).rejects.toThrowError(
      makeTimeoutError()
    )
  })
})

