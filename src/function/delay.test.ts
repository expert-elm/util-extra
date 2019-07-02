import delay from './delay'

describe(`delay()`, () => {
  test(`100ms`, async () => {
    const fn: jest.Mock<void> = jest.fn()
    const beg: number = Date.now()
    const ms: number = 100
    await delay(ms, fn)
    expect(fn).toBeCalled()
    expect(Date.now() - beg).toBeGreaterThan(ms)
  }, 200)

  test(`0ms`, async () => {
    const fn: jest.Mock<void> = jest.fn()
    const beg: number = Date.now()
    const ms: number = 0
    await delay(ms, fn)
    expect(fn).toBeCalled()
    expect(Date.now() - beg).toBeGreaterThan(ms)
  }, 100)
})

