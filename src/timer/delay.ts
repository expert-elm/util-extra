import sleep from './sleep'
import { AnyFunction } from '../type/AnyFunction'

export default async function delay<F extends AnyFunction>(ms: number, fn: F): Promise<ReturnType<F>> {
  await sleep(ms)
  return fn()
}
