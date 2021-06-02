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

/**
 * Test value is object
 * 
 * @param value - test value
 * @returns test results
 * @example ```ts
 * is_object({})   // true
 * is_object(null) // false
 * ```
 */
export function is_object(value: unknown): value is object {
  return 'object' === typeof value && !is_null(value)
}

//#region null prototype object
/**
 * Create object with null prototype
 * 
 * @param object - object
 * @returns null object
 */
export function create_null_object<T extends object>(object?: T): T {
  const obj = Object.create(null)
  if(!object) return obj
  return Object.assign(obj, object)
}

/**
 * Test a object is null prototype
 * 
 * @param object - object
 * @returns test result
 * @example ```ts
 * is_null_object(Object.create(null)) // true
 * is_null_object({})                  // false
 * ```
 */
export function is_null_object<T extends object>(object: T) {
  return is_null(Object.getPrototypeOf(object))
}
//#endregion

//#region enumerable
/**
 * Set property unenumerable
 * 
 * @param object - object
 * @param property - property name
 * @example ```ts
 * const obj = { foo: 42 }
 * set_unenumerable(obj, 'foo')
 * obj.propertyIsEnumerable('foo') // false
 * ```
 */
export function set_unenumerable<T extends object>(object: T, property: keyof T) {
  Object.defineProperty(object, property, { enumerable: false })
}

/**
 * Set property enumerable
 * 
 * @param object - object
 * @param property - property name
 * @example ```ts
 * const obj = { foo: 42 }
 * set_unenumerable(obj, 'foo')
 * obj.propertyIsEnumerable('foo') // true 
 * ```
 */
export function set_enumerable<T extends object>(object: T, property: keyof T) {
  Object.defineProperty(object, property, { enumerable: true })
}

/**
 * Test property is enumerable
 * 
 * @param object - object
 * @param property - property name
 * @returns test result
 * @example ```ts
 * const obj = { foo: 42 }
 * is_enumerable(obj, 'foo') // true
 * is_enumerable(obj, 'bar') // false
 * ```
 */
export function is_enumerable<T extends object>(object: T, property: keyof T) {
  return object.propertyIsEnumerable(property)
}
//#endregion
