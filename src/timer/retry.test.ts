import heartbeat from './retry'

test.skip(`should call function 10 times`, async () => {
  const func: jest.Mock<never> = jest.fn(() => { throw 42 })
  await heartbeat(func)
  expect(func).toHaveBeenCalledTimes(10)
}, 1000 * 100)
