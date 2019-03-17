import wrapBy, { Pair } from './wrapBy'
export { Pair } from './wrapBy'

/** quotes defined from pair */
type Quote = 
  | Pair.SingleQuotes 
  | Pair.DoubleQuotes 
  | Pair.BackQuotes

/**
 * wrap string with quote
 * 
 * @param value string
 * @param quote wrap quote
 */
export default function quoteBy(value: string, quote: Quote = Pair.DoubleQuotes): string {
  return wrapBy(value, quote as string)
}
