import { is_undefined } from './undefined'

/**
 * String.hashCode from Java
 * @see [stackoverflow:generate-a-hash-from-string-in-javascript](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
 * @param value string
 */
export function hash_string(value: string): number {
  let hash = 0
  if (value.length === 0) return hash
  for (let i = 0, len = value.length; i < len; i++) {
    let chr = value.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash
}

/**
 * Generate random string by `Math.random`
 * 
 * @param length string length
 * @throws length greate then 13 or less then 1
 */
export function random_string(length: number = 6): string {
  if(length > 13 || length < 1) throw new Error(`length should less then 14 and greater then 0`)
  return Math.random().toString(36).substr(2, length)
}

/**
 * test value is string type
 * @param value value
 */
export function is_string(value: any): value is string {
  return 'string' === typeof value || '[object String]' === toString.call(value)
}

/**
 * Test string is blank
 * 
 * @param string string
 * @param trim should trim string
 */
export function is_blank_string(string: string, trim: boolean = false): string is '' {
  if(trim) return '' === string.trim()
  return '' === string
}

/**
 * Assert string is blank string
 * 
 * @param str string
 * @param trim should trim string
 * @throws string is blank string
 */
export function assert_non_blank_string(str: string, trim: boolean = false): void {
  if(is_blank_string(str, trim)) throw new Error('string is blank string')
}



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
  if(is_blank_string(str)) return str
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
export function unwrap_deep(str: string, options: unwrapOptions = {}) {
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
export function wrap_pattern(str: string, pairs: PairPattern | string | [ string, string ]): string {
  const [ left, right ]: string[] = is_string(pairs) ? pairs.split('') : pairs
  if(is_undefined(left)) return str
  return left + str + (is_undefined(right) ? left : right)
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
export function wrap_quote(str: string, quote: Quote = PairPattern.DoubleQuotes): string {
  return wrap_pattern(str, quote)
}


/**
 * wrap string with tag and attributes
 * @param str string
 * @param tag xml tag
 * @param attrs attribute object
 */
export function wrap_xml(str: string, tag: string = 'div', attrs?: { [key: string]: string }): string {
  const attrStr: string = (is_blank_string(tag) || is_undefined(attrs)) ? '' : stringify_attrs(attrs)
  const tags: [ string, string ] = [`<${tag}${attrStr}>`, `</${tag}>`]
  return wrap_pattern(str, tags)

  function stringify_attrs(attrs: { [key: string]: string }) {
    const acc: string[] = []
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        const value = attrs[key]
        acc.push(`${key}=${wrap_quote(value)}`)
      }
    }  
    return ' ' + acc.join(' ')
  }
}
