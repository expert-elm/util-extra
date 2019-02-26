interface Result<T, E> {
  readonly value: T | E
  map<U>(fn: (v: T) => U): Result<U, E>
  mapErr<U extends Error>(fn: (e: E) => U): Result<T, U>
  isOk(): boolean
  isErr(): boolean
  and<U>(res: Result<U, E>): Result<U, E>
  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E>
  or<U extends Error>(res: Result<T, U>): Result<T, U>
  orElse<U extends Error>(op: (e: E) => Result<T, U>): Result<T, U>
  unwrap(): T
  unwrapOr<U>(u: U): T | U
  unwrapOrElse<U>(op: (e: E) => U): T | U
}

class _Ok<T> implements Result<T, never> {
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

export function Ok<T>(v: T): Result<T, never> {
  return new _Ok(v)
}

export function Err<E extends Error>(e: E): Result<never, E> {
  return new _Err(e)
}

export function isResult<T, E>(result: Result<T, E>) {
  return isOk(result) || isErr(result)
}

export function isOk<T, E>(result: Result<T, E>) {
  return result instanceof _Ok
}

export function isErr<T, E>(result: Result<T, E>) {
  return result instanceof _Err
}
