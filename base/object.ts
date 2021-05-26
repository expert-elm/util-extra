import { is_null } from './null'

/**
 * get object type
 * 
 * @param object - any object
 * @return Object type string
 */
export function object_type(object: any): string {
  const iden = toString.call(object)
  return iden.substring(8, iden.length - 1)
}


export function make_object_property_non_enumerable(obj: object, property: PropertyKey) {
  Object.defineProperty(obj, property, { enumerable: false })
}

/**
 * test value is object
 * 
 * @param value - test value
 */
export function is_object(value: any): value is object {
  return 'object' === typeof value && !is_null(value)
}

export function create_object_null() {
  return Object.create(null)
}
