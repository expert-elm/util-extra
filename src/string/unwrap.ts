import { Pairs } from './pair'

/** includes predicate function */
export interface IncludePredicateFunction {
  (value: string, firstChar: string, lastChar: string): boolean
}

/**
 * unwrap a string with pairs
 * 
 * @param value string
 * @param includes unwrap pairs scope
 */
export default function unwrap(value: string, includes?: string[] | IncludePredicateFunction): string {
  if('' === value) return value
  const len: number = value.length
  if(1 === len) return value
  const fst: string = value.charAt(0)
  const lst: string = value.charAt(len - 1)
  const join: string = fst + lst

  if('function' === typeof includes) return !includes(value, fst, lst) ? value : value.slice(1, -1)
  const matchers: string[] = undefined !== includes ? includes : Pairs
  if(!matchers.includes(join)) return value
  return value.slice(1, -1)
}
