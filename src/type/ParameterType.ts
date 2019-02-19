type AnyFunction = (...args: any[]) => void
type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never

/**
 * function paramter type
 * 
 * @param F function type
 * @param I argument index
 */
export type ParameterType<F extends AnyFunction, 
                          I extends number = 0> = Parameters<F>[I]
