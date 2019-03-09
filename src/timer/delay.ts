import sleep from './sleep'
import { AnyFunction } from '../type/AnyFunction'

/**
 * delay ms to call function
 * 
 * @param ms sleep ms
 * @param fn caller
 */
export default async function delay<F extends AnyFunction>(ms: number, fn: F): Promise<ReturnType<F>> {
  await sleep(ms)
  return fn()
}
