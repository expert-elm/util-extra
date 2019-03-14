import sleep from './sleep'
import { AnyFunction } from '../type/AnyFunction'

/**
 * delay ms to call function
 * 
 * @param fn caller
 * @param ms sleep ms
 */
export default async function delay<F extends AnyFunction>(fn: F, ms: number = 0): Promise<ReturnType<F>> {
  await sleep(ms)
  return fn()
}
