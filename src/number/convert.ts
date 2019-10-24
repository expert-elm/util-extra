import { assertNaNAndInfinity } from "./predicate"
import { isTrue } from '../is/primitive'

export function toNumeralString(number: number): string {
  assertNaNAndInfinity(number)
  const str: string = number.toString()
  switch(number.toString().slice(-1)) {
    case '1': return str + 'st'
    case '2': return str + 'nd'
    case '3': return str + 'rd'
    default: return str + 'th'
  }
}

export function toPadZeroString(number: number, size: number, { overflow = true }: toPadZeroStringOptions = {}): string {
  assertNaNAndInfinity(number)
  const str: string = number.toString()
  const len: number = str.length
  if(isTrue(overflow) && len > size) throw new Error(`number length was large then size`)
  return str.padStart(size, '0')
}

interface toPadZeroStringOptions {
  readonly overflow?: true
}
