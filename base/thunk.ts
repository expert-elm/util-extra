export type Thunk<T> = () => T

export function thunk<T>(value: T): Thunk<T> {
  return () => value
}
