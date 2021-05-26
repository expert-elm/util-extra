import { is_array } from './array'
import { is_object } from './object'
import { is_null } from './null'
import { is_number } from './number'
import { is_boolean } from './boolean'
import { is_string } from './string'

type JsonObject = { [property: string]: Json }
export type Json =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | Json[]

//#region predicate

export function is_json_array(json: Json): json is Json[] {
  return is_array(json)
}

export function is_json_object(json: Json): json is JsonObject {
  return is_object(json) && !is_json_array(json)
}

export function is_json_string(json: Json): json is string {
  return is_string(json)
}

export function is_json_number(json: Json): json is number {
  return is_number(json)
}

export function is_json_boolean(json: Json): json is boolean {
  return is_boolean(json)
}

export function is_json_null(json: Json): json is null {
  return is_null(json)
}

//#endregion


//#region asserter

function makeError(type: string) {
  return new TypeError(`Invalid json value type "${type}"`)
}

export function assert_json_array(json: Json): asserts json is Json[] {
  if(!is_json_array(json)) throw makeError('array')
}

export function assert_json_object(json: Json): asserts json is JsonObject {
  if(!is_json_object(json)) throw makeError('object')
}

export function assert_json_string(json: Json): asserts json is string {
  if(!is_json_string(json)) throw makeError('string')
}

export function assert_json_boolean(json: Json): asserts json is boolean {
  if(!is_json_boolean(json)) throw makeError('boolean')
}

export function assert_json_number(json: Json): asserts json is number {
  if(!is_json_number(json)) throw makeError('number')
}

export function assert_json_null(json: Json): asserts json is null {
  if(!is_json_null(json)) throw makeError('null')
}
//#endregion

//#region ensure

function ensure_json_factory<T extends Json>(predicate: (json: Json) => json is T, defaultValue: T) {
  return (json: Json): T => {
    return predicate(json) ? json : defaultValue
  }
}

export const ensure_json_array = ensure_json_factory(is_json_array, [])
export const ensure_json_object = ensure_json_factory(is_json_object, {})

//#endregion
