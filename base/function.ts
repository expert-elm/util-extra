import { object_type } from "./object"

/**
 * AnyFunction type
 * @typeParam R - return type
 */
export type AnyFunction<R = any> = (...args: any[]) => R

/**
 * test value is function
 * @param value value
 */
export function is_function<R>(value: any): value is AnyFunction<R> {
  return 'function' === typeof value || 'Function' === object_type(value)
}
