/** 
 * `Result` type, `Ok` or `Err` 
 */
export const enum ResultType { 
  /** Ok, the result success type  */
  Ok, 
  /** Err, the result failure type  */
  Err 
}

/** 
 * A container that value either success (Ok) or failure (Err) 
 */
interface Result<T, E> {
  /**
   * the container value, readonly
   */
  readonly value: T | E
  /**
   * the container type, `Ok` or `Err` readonly
   */
  readonly type: ResultType
  /**
   * return `true` if the result is `Ok`
   */
  isOk(): boolean
  /**
   * return `false` if the result is `Err`
   */
  isErr(): boolean
  /** 
   * converts from `Result<T, E>` to `Maybe<T>`
   * 
   * @todo
   */
  // ok()
  /** 
   * converts from `Result<T, E>` to `Maybe<E>`
   * 
   * @todo
   */
  // err()
  /**
   * map `Result<T, E>` to `Result<U, E>` when the result is `Ok`, keep value at `Err`
   * 
   * @param fn mapper function
   */
  map<U>(fn: (v: T) => U): Result<U, E>
  /** 
   * @todo mapOrElse
   */
  // mapOrElse()
  /**
   * map `Result<T, E>` to `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param fn mapper function
   */
  mapErr<U extends Error>(fn: (e: E) => U): Result<T, U>
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
  /**
   * return `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param res new result
   */
  or<U extends Error>(res: Result<T, U>): Result<T, U>
  /**
   * call `op` and return `Result<T, U>` when the result is `Err`, keep value at `Ok`
   * 
   * @param res new result
   */
  orElse<U extends Error>(op: (e: E) => Result<T, U>): Result<T, U>
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
  /** @todo unwrapErr */ 
  /** @todo unwrapOrDefault */ 
  /** @todo transpose */  
}

class _Ok<T> implements Result<T, never> {
  public readonly type = ResultType.Ok
  constructor(public readonly value: T) {}
  
  map<U>(fn: (v: T) => U): Result<U, never> {
    return new _Ok(fn(this.value))
  }
  
  mapErr<U extends Error>(_fn: (e: never) => U): Result<T, never> {
    return new _Ok(this.value)
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

  or(_res: Result<T, never>): Result<T, never> {
    return new _Ok(this.value)
  }

  orElse(_op: (e: never) => Result<T, never>): Result<T, never> {
    return new _Ok(this.value)
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
}

class _Err<E extends Error> implements Result<never, E> {
  public readonly type = ResultType.Err
  constructor(public readonly value: E) {}
  
  map<U>(_fn: (v: never) => U): Result<never, E> {
    return new _Err(this.value)
  }
  
  mapErr<U extends Error>(fn: (e: E) => U): Result<never, U> {
    return new _Err(fn(this.value))
  }

  isOk(): boolean {
    return false
  }

  isErr(): boolean {
    return true
  }
  
  and(_res: Result<never, E>): Result<never, E> {
    return new _Err(this.value)
  }

  andThen(_op: (v: never) => Result<never, E>): Result<never, E> {
    return new _Err(this.value)
  }

  or<U extends Error>(res: Result<never, U>): Result<never, U> {
    return res
  }

  orElse<U extends Error>(op: (v: E) => Result<never, U>): Result<never, U> {
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
}

/**
 * make a Result Ok container
 * 
 * @param v input value
 */
export function Ok<T>(v: T): Result<T, never> {
  return new _Ok(v)
}

/**
 * make a Result Err container
 * 
 * @param v input value
 */
export function Err<E extends Error>(e: E): Result<never, E> {
  return new _Err(e)
}

/**
 * test given input is or not a result container
 * 
 * @param result target result
 */
export function isResult<T, E>(result: unknown): result is Result<T, E> {
  return result instanceof _Ok || result instanceof _Err
}
