import toPadZero from "../number/toPadZero"
import toNumeral from "../number/toNumeral"

export enum Formatter {
  PadZero,
  Numeral
}

export type FormatterOptions = Formatter | ((number: number) => string)

export default function formatDateNumber(number: number, formatter?: FormatterOptions): string {
  if(undefined === formatter) return number.toString()
  else if(`function` === typeof formatter) return formatter(number)
  else if(Formatter.PadZero === formatter) return toPadZero(number, 2)
  else if(Formatter.Numeral === formatter) return toNumeral(number)
  else throw makeUnknownFormatterError(formatter)
}

export function makeUnknownFormatterError(formatter: unknown): Error {
  return new Error(`Unknown formatter "${String(formatter)}", \
should be Formatter.PadZero, Formatter.Numeral or a number => string function`)
}
