export type AnyFunction = (...args: any[]) => void

export type Parameters<F extends AnyFunction> = F extends (...args: infer P) => void ? P : never

export type Parameter<F extends AnyFunction, Index extends number> = Parameters<F>[Index]
