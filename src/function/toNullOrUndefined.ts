import { Thunk } from '../type/Thunk'

export default function toNullOrUndefiend<T = any, V = null | undefined>(fn: Thunk<T>, nullOrUndefined?: V): T | V {
  try { 
    return fn()
  } catch(_) { 
    return nullOrUndefined as V
  }
}

export function toNull<T = any>(fn: Thunk<T>): T | null {
  return toNullOrUndefiend(fn, null)
}

export function toUndefined<T = any>(fn: Thunk<T>): T | undefined {
  return toNullOrUndefiend(fn, undefined)
}
