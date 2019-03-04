export type Job<T = any> = () => Promise<T>

export interface Props {
  onerror: (err: Error) => void
}
/**
 * A promise queue to running async functions serially
 */
export class Queue<T = any> {
  isRunning = false
  private _queue: Job<T>[] = []
  async enqueue(cb: Job<T>): Promise<T> {
    let res = null as any
    let rej = null as any
    let p = new Promise<T>((_res, _rej) => {
      res = _res
      rej = _rej
    })
    this._queue.unshift(async () => {
      try {
        let ret = await cb()
        res(ret)
        return ret
      } catch (err) {
        rej(err)
        throw err
      }
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
