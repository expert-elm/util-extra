import { AnyArray } from '../Type/any'
import { isZero } from '../Number/predicate'

/**
 * test a value is array type
 * @param value value
 */
export function isArray<T = any>(value: any): value is AnyArray<T> {
  return Array.isArray(value)
}

/**
 * test a array have empty element
 * @param array array
 */
export function isEmptyArray<T>(array: AnyArray<T>): boolean {
  return isZero(array.length)
}
