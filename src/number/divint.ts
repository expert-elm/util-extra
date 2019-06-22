import assertNaN from "./assertNaN"

/** division by 0 or Infinity errors */
export const DIVISION_BY_ZERO_OR_INFINITY_ERROR: Error = new Error(`The dividend cannot be zero`)

/**
 * `a / b` and get integer part
 * 
 * @param a divisor
 * @param b dividend
 * @param notAllowDivisionByZeroOrInfinity allow division by 0 or Infinity
 */
export default function divint(a: number, b: number, notAllowDivisionByZeroOrInfinity: boolean = true): number {
  assertNaN(a)
  assertNaN(b)
  if(false === notAllowDivisionByZeroOrInfinity && (0 === b || isFinite(b))) throw DIVISION_BY_ZERO_OR_INFINITY_ERROR
  return a / b | 0
}
