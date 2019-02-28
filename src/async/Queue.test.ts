import { Queue } from './Queue'
import { sleep } from './sleep'

test('should queued function be executed serially', async () => {
  let queue = new Queue()
  let results = [] as number[]
  const job = (n: number) => async () => {
    await sleep(20 - n * 2)
    results.push(n)
  }
  expect(queue.isRunning).toEqual(false)
  queue.enqueue(job(0))
  queue.enqueue(job(1))
  queue.enqueue(job(2))
  queue.enqueue(job(3))
  expect(queue.isRunning).toEqual(true)
  await sleep(120)
  expect(queue.isRunning).toEqual(false)
  expect(results).toEqual([0, 1, 2, 3])
  results = []
  job(0)()
  job(1)()
  job(2)()
  job(3)()
  await sleep(120)
  expect(results).toEqual([3, 2, 1, 0])
})
