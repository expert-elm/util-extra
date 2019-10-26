import { getObjectType } from '../Object/conversion'
import { AnyFunction } from '../Type/any'

/**
 * test a value is function
 * @param value value
 */
export function isFunction<T>(value: any): value is AnyFunction<T> {
  return 'function' === typeof value || 'Function' === getObjectType(value)
}
