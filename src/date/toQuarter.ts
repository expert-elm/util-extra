import { makeInvalidMonthError } from './makeError'
import assertInvalidDate from './assertInvalidDate'
import formatDateNumber, { FormatterOptions } from './formatDateNumber'

export const enum Quarter {
  First,
  Secondary,
  Third,
  Fourth
}

export default function toQuarter(date: Date, formatter?: FormatterOptions): string {
  assertInvalidDate(date)
  const month: number = date.getMonth()
  const quarter: number = mapToQuarter(month)
  return formatDateNumber(quarter + 1, formatter)
}

function mapToQuarter(month: number): number {
  switch(month) {
    case 0:
    case 1:
    case 2: return Quarter.First
    case 3:
    case 4:
    case 5: return Quarter.Secondary
    case 6:
    case 7: 
    case 8: return Quarter.Third
    case 9:
    case 10:
    case 11: return Quarter.Fourth
    default: throw makeInvalidMonthError(month)
  }
}
