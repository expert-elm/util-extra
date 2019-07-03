import Pair from './pair'
import unwrap from './unwrap'

/**
 * unwrap string by quotes
 * 
 * @param value string
 */
export default function unquote(value: string): ReturnType<typeof unwrap> {
  return unwrap(value, [ 
    Pair.SingleQuotes, 
    Pair.DoubleQuotes,
    Pair.BackQuotes
  ])
}
