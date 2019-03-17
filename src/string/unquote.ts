import unwrap, { Pair } from './unwrap'

export default function unquote(string: string): string {
  return unwrap(string, [ 
    Pair.SingleQuotes, 
    Pair.DoubleQuotes,
    Pair.BackQuotes
  ])
}
