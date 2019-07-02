import sleep from './sleep'
import AnyFunction from '../type/AnyFunction'

export default async function delay<F extends AnyFunction>(millisecond: number, fn: F): Promise<ReturnType<F>> {
  await sleep(millisecond)
  return fn()
}
