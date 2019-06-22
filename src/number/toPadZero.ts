import assertNaN from "./assertNaN"

export const OVERFLOW_ERROR: Error = new Error(`number length was large then size`)

export default function toPadZero(number: number, size: number, throwWhenOverflow: boolean = false): string {
  assertNaN(number)
  const str: string = number.toString()
  const len: number = str.length
  if(throwWhenOverflow && len > size) throw OVERFLOW_ERROR
  return str.padStart(size, `0`)
}
