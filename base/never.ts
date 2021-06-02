/**
 * Throw error, used for switch fall through cases.
 * 
 * @param value - match value
 * @throws error
 * @example ```ts
 * enum T { A, B } 
 * switch(T) {
 *   case T.A: // do somthing with A
 *   case T.B: // do somthing with B
 *   default: throw_never(T) // should never match
 * }
 * ```
 */
export function throw_never(value?: never): never {
  throw new Error('Unknown value ' + value)
}
