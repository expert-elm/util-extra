import retry, { MAX_RETRY_TIMES_ERROR } from './retry'

test(`should retry until success`, async () => {
  let i: number = 0
  const fn: jest.Mock<void> = jest.fn(() => {
    if(i >= 5) return
    i++
    throw 42
  })
  await retry(fn)
  expect(
    fn
  ).toHaveBeenCalledTimes(
    5 + 1
  )
})

test(`should throw when retry max times`, async () => {
  const fn: jest.Mock<void> = jest.fn(() => { throw 42 })
  expect(
    retry(fn, 3)
  ).rejects.toThrowError(
    MAX_RETRY_TIMES_ERROR
  )
  expect(
    fn
  ).toHaveBeenCalledTimes(
    3
  )
})
