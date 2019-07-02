import Thunk from '../type/Thunk'

export default function toBoolean<T = any>(fn: Thunk<T>): boolean {
  try { 
    fn() 
    return true 
  } catch(_) { 
    return false
  }
}
