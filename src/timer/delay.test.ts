import delay from './delay'

test(`should delay ms to exec`, async () => {
  const fn: jest.Mock<void> = jest.fn()
  const beg: number = Date.now()
  const ms: number = 100
  await delay(ms, fn)
  expect(fn).toBeCalled()
  expect(Date.now() - beg).toBeGreaterThan(ms)
})
