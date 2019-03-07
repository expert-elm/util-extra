import sleep from './sleep'

test('should sleep work', async () => {
  let result = 0
  async function testSleep() {
    await sleep(50)
    result = 1
  }
  expect(result).toBe(0)
  expect(testSleep().then(_ => result)).resolves.toBe(1)
  expect(result).toBe(0)
  await sleep(40)
  expect(result).toBe(0)
  await sleep(55)
  expect(result).toBe(1)
})
