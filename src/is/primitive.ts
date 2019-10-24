import { AnyArray, AnyFunction } from 'src/type/any'

//#region undefined & null

export function isUndefined(value: any): value is undefined {
  return undefined === value
}

export function isNull(value: any): value is null {
  return null === value
}

export function isNil(value: any): value is (null | undefined) {
  return isUndefined(value) || isNull(value)
}

//#endregion

//#region number

export function isNumber(value: any): value is number {
  return 'number' === typeof value
}

export function isNaN(value: any): value is typeof NaN {
  return isNumber(value) && Number.isNaN(value)
}

export function isInfinity(value: any): value is typeof Infinity {
  return isNumber(value) && !Number.isFinite(value)
}

export function isZero(value: any): value is 0 {
  return isNumber(value) && 0 === value
}

//#endregion

//#region string

export function isString(value: any): value is string {
  return 'string' === typeof value
}

export function isBlankString(value: any): value is '' {
  return isString(value) && '' === value
}

export function isBlankTrimedString(value: any): value is '' {
  return isString(value) && '' === value.trim()
}

//#endregion

//#region boolean

export function isBoolean(value: any): value is boolean {
  return 'boolean' === typeof value
}

export function isTrue(value: any): value is true {
  return isBoolean(value) && true === value
}

export function isFalse(value: any): value is false {
  return isBoolean(value) && false === value
}

export function isFalsy(value: any): boolean {
  return false === !!value
}

export function isTruthy(value: any): boolean {
  return !isFalsy(value)
}

//#endregion

//#region complex

export function isFunction<T = any>(value: any): value is AnyFunction<T> {
  return 'function' === typeof value
}

export function isArray<T = any>(value: any): value is AnyArray<T> {
  return Array.isArray(value)
}

export function isEmptyArray(value: any): boolean {
  return isArray(value) && isZero(value.length)
}

export function isObject(value: any): value is object {
  return 'object' === typeof value && !isNull(value)
}

//#endregion
