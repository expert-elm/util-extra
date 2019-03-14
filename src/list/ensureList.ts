/**
 * ensure given input was a list
 * 
 * @param list list or a element
 */
export default function ensureList<T>(list: T | T[]): T[] {
  return Array.isArray(list) ? list : [list]
}
