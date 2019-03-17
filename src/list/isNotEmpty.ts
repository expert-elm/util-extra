/**
 * test list was not empty
 * 
 * @param list list
 */
export default function isNotEmpty(list: unknown): boolean {
  return Array.isArray(list) && list.length > 0
}
