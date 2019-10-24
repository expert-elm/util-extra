import { AnyFunction } from '../type/any'

/**
 * @noexport
 */
export const MAX_RETRY_TIMES_ERROR: Error = new Error(`Maximum retry times`)

export default async function retry<F extends AnyFunction>(fn: F, max: number = Infinity): Promise<ReturnType<F>> {
  async function run(times: number): Promise<ReturnType<F>> {
    if(times >= max) throw MAX_RETRY_TIMES_ERROR    
    try {
      return await fn()
    } catch(_) {
      return run(times + 1)
    }
  }
  
  return await run(0)
}
