import { Result, UnpackResult, Ok, Err, isErr, isOk } from './result'

/** `Optional.None` unwrap panic error */
export const OPTIONAL_ERROR: Error = new Error(`Unwrapped Optional.None`)

/** `Optional` transpose error */
export const OPTIONAL_TRANSPOSE: Error = new TypeError(`Only Result<T, E> can be transpose`)

/** `Optional` type */
export const enum OptionalType { 
  /** `Optional.Some` type  */
  Some,
  /** `Optional.None` type  */
  None
}

/** unpack a `Optional<T>` transform to `T` */
export type UnpackOptional<O> = O extends Optional<infer T> ? T : never

/**  a container that have (Some) or not (None) value */
export interface Optional<T> {
  /** the optional container value, readonly */
  readonly value: T | never
  /** the optional container type, `Some` or `None`, readonly */
  readonly type: OptionalType

  /// PREDICATES ///

  /**
   * predicate function, test instance was or not a Optional.Some
   * 
   * @example
   * assert.strictEqual(Some(42).isSome(), true)
   * assert.strictEqual(None.isSome(), false)
   */
  isSome(): boolean
  /**
   * predicate function, test instance was or not a Optional.None
   * 
   * @example
   * assert.strictEqual(Some(42).isNone(), false)
   * assert.strictEqual(None.isNone(), true)
   */
  isNone(): boolean

  /// ITERS ///
  /**
   * maps a `Optional<T>` to `Optional<U>`
   * 
   * @param fn mapper function
   * @example
   * const inc = (a: number): number => a + 1
   * assert.deepStrictEqual(Some(42).map(inc), Some(43))
   * assert.deepStrictEqual(None.map(inc), None)
   */
  map<U>(fn: (v: T) => U): Optional<U>
  mapAsync<U>(fn: (v: T) => Promise<U>): Promise<Optional<U>>
  /**
   * @todo mapOrElse
   */
  // mapOr()
  // mapOrElse()
  // forEach()
  /**
   * filter a `Optional<T>` by a predicate function, return `None` if result is `false`
   * 
   * @param fn predicate function
   */
  filter(fn: (v: T) => boolean): Optional<T>
  filterAsync(fn: (v: T) => Promise<boolean>): Promise<Optional<T>>
  // flatMap()

  /// LOGIC ///

  /**
   * `and` operation for Optional
   * 
   * | Left  | Right | Result |
   * |-------|-------|--------|
   * | SomeL | SomeR | SomeR  |
   * | Some  | None  | None   |
   * | None  | None  | None   |
   * | None  | None  | None   |
   * 
   * @param opt target optional
   * @example
   * assert.deepStrictEqual(Some(42).add(Some(41)), Some(41))
   * assert.deepStrictEqual(Some(42).add(None), None)
   * assert.deepStrictEqual(None.add(Some(42)), None)
   * assert.deepStrictEqual(None.add(None), None)
   */
  and<U>(opt: Optional<U>): Optional<T | U>
  /**
   * `and` operation for lazily evaluated
   * 
   * @param opt target optional
   */
  andThen<U>(op: (v: T) => Optional<U>): Optional<T | U>
  andThenAsync<U>(op: (v: T) => Promise<Optional<U>>): Promise<Optional<U>>
  /**
   * `or` operation for Optional
   * 
   * | Left  | Right | Result |
   * |-------|-------|--------|
   * | SomeL | SomeR | SomeL  |
   * | Some  | None  | Some   |
   * | None  | Some  | Some   |
   * | None  | None  | None   |
   * 
   * @param opt new result
   */
  or<U>(opt: Optional<U>): Optional<T | U>
  /**
   * `or` operation for lazily evaluated
   * 
   * @param op apply function
   */
  orElse<U>(op: (v: T) => Optional<U>): Optional<T | U>
  orElseAsync<U>(op: (v: T) => Promise<Optional<U>>): Promise<Optional<T | U>>
  // xor<U>(opt: Optional<U>): Optional<U>

  /// UNWRAP ///

  /**
   * unwrap the container, throw when `None`
   */
  unwrap(): T
  /**
   * unwrap the container, or get default when `None`
   *   
   * @param u option value
   */
  unwrapOr<U>(u: U): T | U
  /**
   * `unwrapOr` operation for lazily evaluated
   * 
   * @param op caller function
   */
  unwrapOrElse<U>(op: () => U): T | U
  unwrapOrElseAsync<U>(op: () => Promise<U>): Promise<T | U>

  /// RESULT ///
  
  /**
   * transform `Optional<T>` to `Result<T, E>`, mapping `Some(v)` to `Ok(v)`, and
   * `None` to `Err(e)`
   */
  okOr<E>(e: E): Result<T, E>
  /**
   * okOr for lazily evaluated
   * 
   * @param e err mapper
   */
  okOrElse<E>(e: () => E): Result<T, E>
  okOrElseAsync<E>(e: () => Promise<E>): Promise<Result<T, E>>
  /**
   * transposes an `Optional` of a `Result` into a `Result` of an `Optional`,
   * 1. `None` will be mapped to `Ok(None)`
   * 2. `Some(Ok(v))` will be mapped to `Ok(Some(v))`
   * 3. `Some(Err(v))` will be mapped to `Err(v)`
   */
  transpose<U extends UnpackResult<T>>(): Result<Optional<U[0]> | never, U[1]>
}

class OptionalSome<T> implements Optional<T> {
  public readonly type = OptionalType.Some
  constructor(public readonly value: T) {}
  
  map<U>(fn: (v: T) => U): Optional<U> {
    // use momo's solution
    return new OptionalSome(fn(this.value))
    /* try {
      return new _Some(fn(this.value))
    } catch(_) { 
      return None
    } */
  }

  async mapAsync<U>(fn: (v: T) => Promise<U>): Promise<Optional<U>> {
    return new OptionalSome(await fn(this.value))
  }

  filter(fn: (v: T) => boolean): Optional<T> {
    return fn(this.value) ? new OptionalSome(this.value) : None
  }

  async filterAsync(fn: (v: T) => Promise<boolean>): Promise<Optional<T>> {
    return await fn(this.value) ? new OptionalSome(this.value) : None
  }

  isSome(): boolean {
    return true
  }
  
  isNone(): boolean {
    return false
  }
  
  and<U>(opt: Optional<U>): Optional<U> {
    return opt
  }

  andThen<U>(op: (v: T) => Optional<U>): Optional<U> {
    return op(this.value)
  }

  async andThenAsync<U>(op: (v: T) => Promise<Optional<U>>): Promise<Optional<U>> {
    return op(this.value)
  }

  or<U>(_opt: Optional<U>): Optional<T> {
    return new OptionalSome(this.value)
  }

  orElse<U>(_op: (v: T) => Optional<U>): Optional<T> {
    return new OptionalSome(this.value)
  }

  async orElseAsync<U>(_op: (v: T) => Promise<Optional<U>>): Promise<Optional<T | U>> {
    return new OptionalSome(this.value)
  }

  unwrap(): T {
    return this.value
  }

  unwrapOr<U>(_v: U): T {
    return this.value
  }

  unwrapOrElse<U>(_op: () => U): T {
    return this.value
  }

  async unwrapOrElseAsync<U>(_op: () => Promise<U>): Promise<T> {
    return this.value
  }

  okOr(_e: never): Result<T, never> {
    return Ok(this.value)
  }

  okOrElse(_e: () => never): Result<T, never>{
    return Ok(this.value)
  }

  async okOrElseAsync(_e: () => Promise<never>): Promise<Result<T, never>> {
    return Ok(this.value)
  }

  transpose<U extends UnpackResult<T>>(): Result<Optional<U[0]> | never, U[1]> {
    if(isErr<U[1]>(this.value)) {
      return Err(this.value.unwrapErr())
    } else if(isOk<U[0]>(this.value)) {
      return Ok(Some(this.value.unwrap()))
    } else {
      throw OPTIONAL_TRANSPOSE
    }
  }
}

class OptionalNone implements Optional<never> {
  public readonly value!: never
  public readonly type = OptionalType.None

  map<U>(_fn: (_v: never) => U): Optional<never> {
    return None
  }

  async mapAsync<U>(_fn: (_v: never) => Promise<U>): Promise<Optional<never>> {
    return None
  }

  filter(_fn: (v: never) => boolean): Optional<never> {
    return None
  }

  async filterAsync(_fn: (v: never) => Promise<boolean>): Promise<Optional<never>> {
    return None
  }

  isSome(): boolean {
    return false
  }

  isNone(): boolean {
    return true
  }
  
  and<U>(_opt: Optional<U>): Optional<never> {
    return None
  }

  andThen<U>(_op: (v: never) => Optional<U>): Optional<never> {
    return None
  }

  async andThenAsync<U>(_op: (v: never) => Promise<Optional<U>>): Promise<Optional<never>> {
    return None
  }

  or<U>(opt: Optional<U>): Optional<U> {
    return opt
  }

  orElse<U>(op: (v: never) => Optional<U>): Optional<U> {
    return op(this.value)
  }

  async orElseAsync<U>(op: (v: never) => Promise<Optional<U>>): Promise<Optional<U>> {
    return op(this.value)
  }

  unwrap(): never {
    throw OPTIONAL_ERROR
  }

  unwrapOr<U>(v: U): U {
    return v
  }

  unwrapOrElse<U>(op: (e: never) => U): U {
    return op(this.value)
  }

  async unwrapOrElseAsync<U>(op: (e: never) => Promise<U>): Promise<U> {
    return op(this.value)
  }

  okOr<E>(e: E): Result<never, E> {
    return Err(e)
  }

  okOrElse<E>(e: () => E): Result<never, E> {
    return Err(e())
  }

  async okOrElseAsync<E>(e: () => Promise<E>): Promise<Result<never, E>> {
    return Err(await e())
  }

  transpose(): Result<Optional<never>, never> {
    return Ok(None)
  }
}

/**
 * Optional.Some
 * 
 * @param v value
 */
export function Some<T>(v: T): Optional<T> {
  return new OptionalSome(v)
}

/** Optional.None */
export const None: Optional<never> = new OptionalNone()



/// PREDICATE ///

/**
 * test given is or not a Optional
 * 
 * @param result target result
 */
export function isOptional<T>(value: unknown): value is Optional<T> {
  return isSome(value) || isNone(value)
}

/**
 * test value is or not Optional.Some
 * 
 * @param value value
 */
export function isSome<T>(value: unknown): value is Optional<T> {
  return value instanceof OptionalSome
}

/**
 * test value is or not Optional.Some
 * 
 * @param value value
 */
export function isNone(value: unknown): value is Optional<never> {
  return value === None
}
