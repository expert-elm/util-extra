import { overrideProperty, Fn } from './utils'
import { Queue } from '../async/Queue'

/**
 * Running async tasks as FIFO
 */
export const queued = () => (
  _target: any,
  _prop: PropertyKey,
  desc: TypedPropertyDescriptor<Fn>,
) => {
  overrideProperty<Fn>(desc, fn => {
    let queue = new Queue()
    return async function(this: any, ...args: any[]) {
      return queue.enqueue(async () => {
        await fn.apply(this, args)
      })
    }
  })
}
