import { Pair } from './unwrap'
export { Pair } from './unwrap'

/**
 * wrap a string with pairs
 * 
 * @param value string
 * @param pairs join pairs
 */
export default function wrapBy(value: string, pairs: Pair | string | [string, string]): string {
  const [ left, right ]: string[] = 'string' === typeof pairs ? pairs.split('') : pairs
  if(undefined === left) return value
  return left + value + (undefined === right ? left : right)
}
