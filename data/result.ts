import { Optional, UnpackOptional, isSome, isNone, Some, None } from './optional'

/** `Result` transpose error */
export const RESULT_TRANSPOSE: Error = new TypeError(`Only Optional<T> can be transpose`)

/** `Result` type, `Ok` or `Err` */
export const enum ResultType { 
  /** Ok, the result success type  */
  Ok, 
  /** Err, the result failure type  */
  Err 
}

/** 
 * unpack a `Result<T, E>` transform to `[T, E]` tuple
 * 
 * @typeparam R result
 */
export type UnpackResult<R> = R extends Result<
  infer T, 
  infer E
> ? [T, E] : never

/** 
 * A container that value either success (Ok) or failure (Err) 
 */
export interface Result<T, E> {
  /**
   * the container value, readonly
   */
  readonly value: T | E
  /**
   * the container type, `Ok` or `Err` readonly
   */
  readonly type: ResultType

  /// PREDICATES ///

  /**
   * return `true` if the result is `Ok`
   */
  isOk(): boolean
  /**
   * return `false` if the result is `Err`
   */
  isErr(): boolean
  

  /// MAPPING ///

  /**
   * map `Result<T, E>` to `Result<U, E>` when the result is `Ok`, keep value at `Err`
   * 
   * @param fn mapper function
   */
  map<U>(fn: (v: T) => U): Result<U, E>
  mapAsync<U>(fn: (v: T) => Promise<U>): Promise<Result<U, E>>
  /** 
   * @todo mapOrElse
   */
  // mapOrElse()
  /**
   * map `Result<T, E>` to `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param fn mapper function
   */
  mapErr<U>(fn: (e: E) => U): Result<T, U>
  mapErrAsync<U>(fn: (e: E) => Promise<U>): Promise<Result<T, U>>
  /**
   * return `Result<U, E>` when the result is `Ok`, keep value at `Err`
   * 
   * @param res new result
   */
  and<U>(res: Result<U, E>): Result<U, E>
  /**
   * call `op` and return `Result<U, E>` when the result is `Ok`, keep value at `Err`
   * 
   * @param res new result
   */
  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E>
  andThenAsync<U>(op: (v: T) => Promise<Result<U, E>>): Promise<Result<U, E>>
  /**
   * return `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param res new result
   */
  or<U>(res: Result<T, U>): Result<T, U>
  /**
   * call `op` and return `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param res new result
   */
  orElse<U>(op: (e: E) => Result<T, U>): Result<T, U>
  orElseAsync<U>(op: (e: E) => Promise<Result<T, U>>): Promise<Result<T, U>>
  /**
   * unwrap the container, get value, throw when result is `Err`
   */
  unwrap(): T
  /**
   * unwrap the container, get value, when the result is `Err`, return given option
   *   
   * @param u option value
   */
  unwrapOr<U>(u: U): T | U
  /**
   * unwrap the container and get value, when the result is `Err`, call op wieh `E`
   * 
   * @param op caller function
   */
  unwrapOrElse<U>(op: (e: E) => U): T | U
  unwrapOrElseAsync<U>(op: (e: E) => Promise<U>): Promise<T | U>
  /** 
   * unwrap and get error, throw when the result is `Ok`
   */ 
  unwrapErr(): E
  /** 
   * converts from `Result<T, E>` to `Optional<T>`
   */
  ok(): Optional<T>
  /** 
   * converts from `Result<T, E>` to `Optional<E>`
   */
  err(): Optional<E>
  /**
   * transposes a `Result` of an `Optional` into `Optional` of a `Result`
   * 1. `Ok(Some(v))` will be mapped to `Some(Ok(v))`
   * 2. `Err(v)` will be mapped to `Some(Err(v))`
   * 3. `Ok(None)` will be mapped to `None`
   */
  transpose<U extends UnpackOptional<T>>(): Optional<Result<U, E>>
}

class ResultOk<T> implements Result<T, never> {
  public readonly type = ResultType.Ok
  constructor(public readonly value: T) {}
  
  map<U>(fn: (v: T) => U): Result<U, never> {
    return new ResultOk(fn(this.value))
  }

  async mapAsync<U>(fn: (v: T) => Promise<U>): Promise<Result<U, never>> {
    return new ResultOk(await fn(this.value))
  }
  
  mapErr<U>(_fn: (e: never) => U): Result<T, never> {
    return new ResultOk(this.value)
  }

  async mapErrAsync<U>(_fn: (e: never) => Promise<U>): Promise<Result<T, never>> {
    return new ResultOk(this.value)
  }

  isOk(): boolean {
    return true
  }
  
  isErr(): boolean {
    return false
  }
  
  and<U>(res: Result<U, never>): Result<U, never> {
    return res
  }

  andThen<U>(op: (v: T) => Result<U, never>): Result<U, never> {
    return op(this.value)
  }

  async andThenAsync<U>(op: (v: T) => Promise<Result<U, never>>): Promise<Result<U, never>> {
    return op(this.value)
  }

  or(_res: Result<T, never>): Result<T, never> {
    return new ResultOk(this.value)
  }

  orElse(_op: (e: never) => Result<T, never>): Result<T, never> {
    return new ResultOk(this.value)
  }

  async orElseAsync(_op: (e: never) => Promise<Result<T, never>>): Promise<Result<T, never>> {
    return new ResultOk(this.value)
  }

  unwrap(): T {
    return this.value
  }

  unwrapOr(_v: any): T {
    return this.value
  }

  unwrapOrElse<U>(_op: (e: never) => U): T {
    return this.value
  }

  async unwrapOrElseAsync<U>(_op: (e: never) => Promise<U>): Promise<T> {
    return this.value
  }

  unwrapErr(): never {
    throw this.value
  }

  ok(): Optional<T> {
    return Some(this.value)
  }

  err(): Optional<never> {
    return None
  }

  transpose<U extends UnpackOptional<T>>(): Optional<Result<U, never> | never> {
    if(isSome<U>(this.value)) {
      return Some(Ok(this.value.unwrap()) )
    } else if(isNone(this.value)) {
      return None
    } else {
      throw RESULT_TRANSPOSE
    }
  }
}

class ResultErr<E> implements Result<never, E> {
  public readonly type = ResultType.Err
  constructor(public readonly value: E) {}
  
  map<U>(_fn: (v: never) => U): Result<never, E> {
    return new ResultErr(this.value)
  }

  async mapAsync<U>(_fn: (v: never) => Promise<U>): Promise<Result<never, E>> {
    return new ResultErr(this.value)
  }
  
  mapErr<U>(fn: (e: E) => U): Result<never, U> {
    return new ResultErr(fn(this.value))
  }

  async mapErrAsync<U>(fn: (e: E) => Promise<U>): Promise<Result<never, U>> {
    return new ResultErr(await fn(this.value))
  }

  isOk(): boolean {
    return false
  }

  isErr(): boolean {
    return true
  }
  
  and(_res: Result<never, E>): Result<never, E> {
    return new ResultErr(this.value)
  }

  andThen(_op: (v: never) => Result<never, E>): Result<never, E> {
    return new ResultErr(this.value)
  }

  async andThenAsync(_op: (v: never) => Promise<Result<never, E>>): Promise<Result<never, E>> {
    return new ResultErr(this.value)
  }

  or<U>(res: Result<never, U>): Result<never, U> {
    return res
  }

  orElse<U>(op: (v: E) => Result<never, U>): Result<never, U> {
    return op(this.value)
  }

  async orElseAsync<U>(op: (v: E) => Promise<Result<never, U>>): Promise<Result<never, U>> {
    return op(this.value)
  }

  unwrap(): never {
    throw this.value
  }

  unwrapOr<U>(v: U): U {
    return v
  }

  unwrapOrElse<U>(op: (e: E) => U): U {
    return op(this.value)
  }

  async unwrapOrElseAsync<U>(op: (e: E) => Promise<U>): Promise<U> {
    return op(this.value)
  }

  unwrapErr(): E {
    return this.value
  }

  ok(): Optional<never> {
    return None
  }

  err(): Optional<E> {
    return Some(this.value)
  }

  transpose(): Optional<Result<never, E>> {
    return Some(Err(this.value))
  }
}

/**
 * make a Result Ok container
 * 
 * @param v input value
 */
export function Ok<T>(v: T): Result<T, never> {
  return new ResultOk(v)
}

/**
 * make a Result Err container
 * 
 * @param v input value
 */
export function Err<E>(e: E): Result<never, E> {
  return new ResultErr(e)
}


/// PREDICATE ///

/**
 * test value is or not a `Result<T, E>`
 * 
 * @param value value
 */
export function is_result<T, E>(value: unknown): value is Result<T, E> {
  return is_ok(value) || is_err(value)
}

/**
 * test value is or not a `Ok<T>`
 * 
 * @param value value
 */
export function is_ok<T>(value: unknown): value is Result<T, never> {
  return value instanceof ResultOk
}

/**
 * test value is or not a `Err<E>`
 * 
 * @param value value
 */
export function is_err<E>(value: unknown): value is Result<never, E> {
  return value instanceof ResultErr
}
