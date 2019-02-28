import { Fn, overrideProperty } from './utils'

/**
 * Limited current running async tasks in {maxCount}, you can choose different strategies when exceed.
 * Strategies:
 *   1. waiting: waiting current running tasks finished. This won't ensure tasks are FIFO
 *   2. last: exceeded task will return last promise
 *   3. error: exceeded task will throw an error
 * @param maxCount
 * @param handleExceed
 */
export const limited = (
  maxCount = 1,
  handleExceed = 'waiting' as 'last' | 'error' | 'waiting',
) => (
  _target: any,
  _prop: PropertyKey,
  desc: TypedPropertyDescriptor<Fn<Promise<any>>>,
) => {
  overrideProperty(desc, fn => {
    let currentPromises: Promise<any>[] = []
    let removePromise = (p: Promise<any>) => {
      currentPromises = currentPromises.filter(i => i !== p)
    }
    function exec(this: any, ...args: any[]) {
      let p = Promise.resolve(fn.apply(this, args))
        .then(ret => {
          removePromise(p)
          return ret
        })
        .catch(err => {
          removePromise(p)
          throw err
        })
      currentPromises.push(p)
      return p
    }
    return async function(this: any, ...args: any[]) {
      if (currentPromises.length < maxCount) {
        return exec.apply(this, args)
      } else {
        switch (handleExceed) {
          case 'last':
            return currentPromises[currentPromises.length - 1]
          case 'waiting':
            while (currentPromises.length >= maxCount) {
              await Promise.race(currentPromises)
            }
            return exec.apply(this, args)
          case 'error':
            throw new Error(
              `Limited async method ${fn.name} exceed max count: ${maxCount}`,
            )
        }
      }
    }
  })
}
