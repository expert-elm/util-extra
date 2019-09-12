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

export const Pairs: string[] = [
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

export default Pair
