import * as ts from 'typescript'
import { ParameterType } from './ParameterType'

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object"

test(`should assert type`, () => {
  type T = (a: string) => void
  type T1 = ParameterType<T, 0>
  function isT(a: unknown): a is string { return typeof a === 'string' }
  var foo: TypeName<T1>
  isT(foo)
})
