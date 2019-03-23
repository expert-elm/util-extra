import { Thunk } from "../type/Thunk"
import { Optional, Some, None } from "../container/optional"
import { Result, Ok, Err } from "../container/result"

export function toBoolean(fn: Thunk<any>): boolean {
  try { 
    fn() 
    return true 
  } catch(_) { 
    return false
  }
}

export function toNullable<R>(fn: Thunk<R>): R | null {
  try { 
    return fn() 
  } catch(_) { 
    return null
  }
}

export function toOptional<R>(fn: Thunk<R>): Optional<R> {
  try { 
    return Some(fn())
  } catch(_) { 
    return None
  }
}

export function toResult<R, E>(fn: Thunk<R>): Result<R, E> {
  try {
    return Ok(fn())
  } catch(e) {
    return Err(e)
  }
}
