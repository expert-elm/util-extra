import { is_null } from './null'
import { is_undefined } from './undefined'

export type Nil = undefined | null

export function is_nil(value: unknown): value is Nil {
  return is_undefined(value) || is_null(value)
}

export function assert_nil(value: unknown): asserts value is Nil {
  if(!is_nil(value)) throw new Error(`Uncaught AssertionError: ${value} == undefined or ${value} == null`)
}
