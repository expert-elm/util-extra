export class Result<T, E extends Error> {
  constructor(private value: T | E) {}
  
  map<U>(fn: (v: T) => U): Result<U, E> {
    if(this.value instanceof Error) return new Result(this.value)
    return new Result(fn(this.value))
  }
  
  mapErr<U extends Error>(fn: (e: E) => U): Result<T, U> {
    if(!(this.value instanceof Error)) return new Result(this.value)
    return new Result(fn(this.value))
  }

  isOk(): boolean {
    return !this.isErr()
  }
  isErr(): boolean {
    return this.value instanceof Error
  }
  
  and<U>(res: Result<U, E>): Result<U, E> {
    if(this.value instanceof Error) return new Result(this.value)
    return res
  }

  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E> {
    if(this.value instanceof Error) return new Result(this.value)
    return op(this.value)
  }

  or<U extends Error>(res: Result<T, U>): Result<T, U> {
    if(!(this.value instanceof Error)) return new Result(this.value)
    return res
  }

  orElse<U extends Error>(op: (v: E) => Result<T, U>): Result<T, U> {
    if(!(this.value instanceof Error)) return new Result(this.value)
    return op(this.value)
  }

  unwrap(): T {
    if(!(this.value instanceof Error)) return this.value
    throw this.value
  }

  unwrapOr<U>(v: U): U | T {
    if(this.value instanceof Error) return v
    return this.value
  }

  unwrapOrElse<U>(op: (e: E) => U): T | U {
    if(this.value instanceof Error) return op(this.value)
    return this.value
  }
}

export function Ok<T>(v: T): Result<T, never> {
  return new Result(v)
}

export function Err<E extends Error>(e: E): Result<never, E> {
  return new Result(e)
}
