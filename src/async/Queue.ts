export type Job<T = any> = () => Promise<T>

/**
 * A promise queue to running async functions serially
 */
export class Queue<T = any> {
  isRunning = false
  private _queue: Job<T>[] = []
  async enqueue(cb: Job<T>): Promise<T> {
    let res = null as any
    let p = new Promise<T>(r => (res = r))
    this._queue.unshift(async () => {
      let ret = await cb()
      res(ret)
      return ret
    })
    if (this.isRunning) return p
    this.isRunning = true
    ;(async () => {
      while (this._queue.length) {
        try {
          await this._queue.pop()!()
        } catch (error) {
          console.error(error)
        }
      }
      this.isRunning = false
    })()
    return p
  }
}
