import { limited } from './limited'
import { sleep } from '../async/sleep'

const start = Date.now()
class WaitingJob {
  runningCount = 0
  finishedCount = 0
  @limited(1, 'waiting')
  async job() {
    console.log('waitjob', Date.now() - start)
    this.runningCount += 1
    await sleep(10)
    console.log('waitjobEnd', Date.now() - start)
    this.runningCount -= 1
    this.finishedCount += 1
    return [this.runningCount, this.finishedCount]
  }
}
class LastJob {
  runningCount = 0
  finishedCount = 0
  @limited(1, 'last')
  async job() {
    this.runningCount += 1
    await sleep(10)
    this.runningCount -= 1
    this.finishedCount += 1
    return [this.runningCount, this.finishedCount]
  }
}

class ErrJob {
  runningCount = 0
  finishedCount = 0
  @limited(1, 'error')
  async job() {
    this.runningCount += 1
    await sleep(10)
    this.runningCount -= 1
    this.finishedCount += 1
    return [this.runningCount, this.finishedCount]
  }
}

test('should limit(waiting) work', async () => {
  let job = new WaitingJob()
  let p1 = job.job()
  let p2 = job.job()
  let p3 = job.job()
  await sleep(1)
  expect(job.runningCount).toEqual(1)
  expect(job.finishedCount).toEqual(0)
  await p1
  expect(job.runningCount).toEqual(1)
  expect(job.finishedCount).toEqual(1)
  await p2
  expect(job.runningCount).toEqual(1)
  expect(job.finishedCount).toEqual(2)
  await p3
  expect(job.runningCount).toEqual(0)
  expect(job.finishedCount).toEqual(3)
})
let noop = () => {}
test('should limit(last) work', async () => {
  let job = new LastJob()
  let p1 = job.job()
  let p2 = job.job()
  let p3 = job.job()
  expect(p1).resolves.toEqual([0, 1])
  expect(p2).resolves.toEqual([0, 1])
  expect(p3).resolves.toEqual([0, 1])
  await sleep(1)
  expect(job.runningCount).toEqual(1)
  expect(job.finishedCount).toEqual(0)
  await p1
  expect(job.runningCount).toEqual(0)
  expect(job.finishedCount).toEqual(1)
  await p2.catch(noop)
  expect(job.runningCount).toEqual(0)
  expect(job.finishedCount).toEqual(1)
  await p3.catch(noop)
  console.log(job)
  expect(job.runningCount).toEqual(0)
  expect(job.finishedCount).toEqual(1)
  let p4 = job.job()
  await sleep(1)
  expect(job.runningCount).toEqual(1)
  expect(job.finishedCount).toEqual(1)
  await p4
  expect(job.runningCount).toEqual(0)
  expect(job.finishedCount).toEqual(2)
})

test('should limit(error) work', async () => {
  let job = new ErrJob()

  let p1 = job.job()
  expect(p1).resolves.toEqual([0, 1])
  expect(job.job()).rejects.toMatchObject({
    message: `Limited async method job exceed max count: 1`,
  })
  expect(job.job()).rejects.toMatchObject({
    message: `Limited async method job exceed max count: 1`,
  })
  expect(job.finishedCount).toEqual(0)
  await p1
  expect(job.finishedCount).toEqual(1)
  await sleep(11)
  expect(job.finishedCount).toEqual(1)
  await sleep(11)
  expect(job.finishedCount).toEqual(1)
})
