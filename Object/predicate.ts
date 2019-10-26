import { isNull } from '../Null/predicate'

export function isObject(value: any): value is object {
  return 'object' === typeof value && !isNull(value)
}
