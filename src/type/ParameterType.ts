import { AnyFunction } from './AnyFunction'

export type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never

/**
 * function paramter type
 * 
 * @param F function type
 * @param I argument index, default to 0
 */
export type ParameterType<F extends AnyFunction, 
                          I extends number = 0> = Parameters<F>[I]
