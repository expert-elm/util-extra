import { AnyFunction } from '../type/AnyFunction'

/** timeout throw errors */
export const TIMEOUT_ERROR: Error = new Error(`Timeout`)

/**
 * call function and timeout ms
 * 
 * @param ms how long to timeout
 * @param fn caller
 */
export default function timeout<F extends AnyFunction>(ms: number, fn: F): Promise<ReturnType<F>> {
  return new Promise(async (res, rej) => {    
    const timer = setTimeout(() => {
      rej(TIMEOUT_ERROR)
      clearTimeout(timer)
    }, ms)
    
    res(await fn())
  })
}
