/** build-in pairs */
export const enum Pair {
  SingleQuotes = "''",
  DoubleQuotes = '""',
  BackQuotes = '``',
  Parenthesis = '()',
  SquareBrackets = '[]',
  Braces = '{}',
  AngleBrackets = '<>',
  Underscores = '__',
  Stars = '**'
}

/** build-in pair list */
export const BUILDIN_PAIRS: string[] = [
  Pair.SingleQuotes,
  Pair.DoubleQuotes,
  Pair.BackQuotes,
  Pair.Parenthesis,
  Pair.SquareBrackets,
  Pair.Braces,
  Pair.AngleBrackets,
  Pair.Underscores,
  Pair.Stars
]

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
  const len = value.length
  if(1 === len) return value
  const fst: string = value.charAt(0)
  const lst: string = value.charAt(len - 1)
  const join: string = fst + lst

  if('function' === typeof includes) return !includes(value, fst, lst) ? value : spliter(value)
  const matchers = undefined !== includes ? includes : BUILDIN_PAIRS
  if(!matchers.includes(join)) return value
  return value.slice(1, -1)
}

/**
 * slice string trim head and tail
 * 
 * @param value 
 */
function spliter(value: string): string {
  return value.slice(1, -1)
}
