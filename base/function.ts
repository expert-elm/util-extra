import { object_type } from "./object"

/**
 * AnyFunction type
 * 
 * @typeParam R - function return type
 */
export type AnyFunction<R = any> = (...args: any[]) => R

/**
 * Test value is function
 * 
 * @param value - value
 * @returns test result
 * @example ```ts
 * is_function(function() {})  // true
 * is_function(function*() {}) // true
 * is_function(()=>{})         // true
 * is_function(class {})       // true
 * ```
 * @inline
 */
export function is_function<R>(value: any): value is AnyFunction<R> {
  return 'function' === typeof value || 'Function' === object_type(value)
}
