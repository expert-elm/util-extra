type AnyFunction = (...args: any[]) => void

type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never

export type ParameterType<F extends AnyFunction, Index extends number> = Parameters<F>[Index]
