import validateNaN from "./validateNaN"

export const DIVISION_BY_ZERO_ERROR: Error = new Error(`The dividend cannot be zero`)

export default function divint(a: number, b: number, notAllowDivisionByZero: boolean = true): number {
  validateNaN(a)
  validateNaN(b)
  if(!notAllowDivisionByZero && 0 === b) throw DIVISION_BY_ZERO_ERROR
  return a / b | 0
}
