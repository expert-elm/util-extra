import { AnyFunction } from './any'
type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never
export type ParameterType<F extends AnyFunction, I extends number = 0> = Parameters<F>[I]

