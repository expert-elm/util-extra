import sleep from '../function/sleep'
import { queued } from './queued'

class Job {
  results: number[] = []
  @queued()
  async queuedJob(n: number) {
    await sleep(20 - n * 2)
    this.results.push(n)
  }
  async normalJob(n: number) {
    await sleep(20 - n * 2)
    this.results.push(n)
  }
}

test('should queued method be executed serially', async () => {
  let job = new Job()
  job.queuedJob(0)
  job.queuedJob(1)
  job.queuedJob(2)
  let p = job.queuedJob(3)
  expect(job.results).toEqual([])
  await p
  expect(job.results).toEqual([0, 1, 2, 3])
  job.results = []
  job.normalJob(0)
  job.normalJob(1)
  job.normalJob(2)
  job.normalJob(3)
  await sleep(120)
  expect(job.results).toEqual([3, 2, 1, 0])
})
