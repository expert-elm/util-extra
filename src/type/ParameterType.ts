import AnyFunction from './AnyFunction'
type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never
type ParameterType<F extends AnyFunction, I extends number = 0> = Parameters<F>[I]
export default ParameterType
