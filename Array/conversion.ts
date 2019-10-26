/**
 * convert T to T[]
 * @param array array or a element of array
 */
export function ensureArray<T>(array: T | T[]): T[] {
  return Array.isArray(array) ? array : [ array ]
}
