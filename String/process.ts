import { isBlankString, isString } from "./predicate"
import { isUndefined } from "../Null/predicate"

export const enum PairPattern {
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

const DEFAULT_PAIRS: string[] = [
  PairPattern.SingleQuotes,
  PairPattern.DoubleQuotes,
  PairPattern.BackQuotes,
  PairPattern.Parenthesis,
  PairPattern.SquareBrackets,
  PairPattern.Braces,
  PairPattern.AngleBrackets,
  PairPattern.Underscores,
  PairPattern.Stars
]

/**
 * unwrap a string with pair patterns
 * @param str string
 * @param options unwrapOptions
 */
export function unwrap(str: string, { defaultPairs = true, include = [], exclude = [] }: unwrapOptions = {}): string {
  if(isBlankString(str)) return str
  const len: number = str.length
  if(1 === len) return str
  const fst: string = str.charAt(0)
  const lst: string = str.charAt(len - 1)
  const join: string = fst + lst

  const defaults: string[] = defaultPairs ? DEFAULT_PAIRS : []
  const pairs = defaults.concat(include).filter(pair => !exclude.includes(pair))

  if(!pairs.includes(join)) return str
  return str.substring(1, len - 1)
}

/**
 * unwrap deep
 * @param str string
 * @param options unwrapOptions
 */
export function unwrapDeep(str: string, options: unwrapOptions = {}) {
  let prev: string = str
  let curr: string

  while((curr = unwrap(prev, options))) {
    if(curr === prev) return prev
    prev = curr
  }

  return curr
}

/**
 * unquote word
 * @param str string
 * @param options options pass to isBlankString
 */
export function unquote(str: string): string {
  return unwrap(str, {
    defaultPairs: false,
    include: [ 
      PairPattern.SingleQuotes, 
      PairPattern.DoubleQuotes,
      PairPattern.BackQuotes
    ]
  })
}

/**
 * unwrap options
 */
interface unwrapOptions {
  /**
   * not use default pairs
   */
  readonly defaultPairs?: boolean
  /**
   * exclude some pairs
   */
  readonly exclude?: ReadonlyArray<string>
  /**
   * include some pairs
   */
  readonly include?: ReadonlyArray<string>
} 

/**
 * wrap a string by pairs pattern
 * @param str string
 * @param pairs join pairs
 */
export function wrapPattern(str: string, pairs: PairPattern | string | [ string, string ]): string {
  const [ left, right ]: string[] = isString(pairs) ? pairs.split('') : pairs
  if(isUndefined(left)) return str
  return left + str + (isUndefined(right) ? left : right)
}

type Quote = 
  | PairPattern.SingleQuotes 
  | PairPattern.DoubleQuotes 
  | PairPattern.BackQuotes

/**
 * wrap string with quote
 * @param str string
 * @param quote wrap quote, default to Pair.DoubleQuotes
 */
export function wrapQuote(str: string, quote: Quote = PairPattern.DoubleQuotes): string {
  return wrapPattern(str, quote)
}


/**
 * wrap string with tag and attributes
 * @param str string
 * @param tag xml tag
 * @param attrs attribute object
 */
export function wrapXMLTag(str: string, tag: string = 'div', attrs?: { [key: string]: string }): string {
  const attrStr: string = (isBlankString(tag) || isUndefined(attrs)) ? '' : stringifyAttrs(attrs)
  const tags: [ string, string ] = [`<${tag}${attrStr}>`, `</${tag}>`]
  return wrapPattern(str, tags)

  function stringifyAttrs(attrs: { [key: string]: string }) {
    const acc: string[] = []
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        const value = attrs[key]
        acc.push(`${key}=${wrapQuote(value)}`)
      }
    }  
    return ' ' + acc.join(' ')
  }
}
