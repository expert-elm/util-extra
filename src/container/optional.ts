/** Optional.None unwrap panic error */
export const OPTIONAL_ERROR: Error = new Error(`Unwrapped Optional.None`)

/** `Optional` type */
export const enum OptionalType { 
  /** `Optional.Some` type  */
  Some,
  /** `Optional.None` type  */
  None
}

/**  A container that have (Some) or not (None) value */
interface Optional<T> {
  /** the optional container value, readonly */
  readonly value: T | never
  /** the optional container type, `Some` or `None`, readonly */
  readonly type: OptionalType

  /// predicates ///

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

  /// iters ///
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
  // flatMap()

  /// binary operations

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
  // xor()

  /// unwrap ///

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

  /// with result ///
  // okOr()
  // okOrElse()
  // transpose()
}

class _Some<T> implements Optional<T> {
  public readonly type = OptionalType.Some
  constructor(public readonly value: T) {}
  
  map<U>(fn: (v: T) => U): Optional<U> {
    // use momo's solution
    return new _Some(fn(this.value))
    /* try {
      return new _Some(fn(this.value))
    } catch(_) { 
      return None
    } */
  }

  filter(fn: (v: T) => boolean): Optional<T> {
    return fn(this.value) ? new _Some(this.value) : None
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

  or<U>(_opt: Optional<U>): Optional<T> {
    return new _Some(this.value)
  }

  orElse<U>(_op: (v: T) => Optional<U>): Optional<T> {
    return new _Some(this.value)
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
}

class _None implements Optional<never> {
  public readonly value!: never
  public readonly type = OptionalType.None

  map<U>(_fn: (_v: never) => U): Optional<never> {
    return None
  }

  filter(_fn: (v: never) => boolean): Optional<never> {
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

  or<U>(opt: Optional<U>): Optional<U> {
    return opt
  }

  orElse<U>(op: (v: never) => Optional<U>): Optional<U> {
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
}

/**
 * Optional.Some
 * 
 * @param v value
 */
export function Some<T>(v: T): Optional<T> {
  return new _Some(v)
}

/** Optional.None */
export const None: Optional<never> = new _None()

/**
 * create a Optional by value
 * @param v value
 */
export function Optional<T>(v: T): Optional<T> {
  return v === null || v === void 0 ? None : Some(v)
}

/**
 * test given is or not a Optional
 * 
 * @param result target result
 */
export function isOptional<T>(opt: unknown): opt is Optional<T> {
  return opt instanceof _Some || opt === None
}
