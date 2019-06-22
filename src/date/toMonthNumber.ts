import { makeInvalidMonthError } from './makeError'
import assertInvalidDate from "./assertInvalidDate"
import formatDateNumber, { FormatterOptions } from "./formatDateNumber"

export default function toMonthNumber(date: Date, formatter?: FormatterOptions): string {
  const month = date.getMonth()
  assertInvalidDate(date, makeInvalidMonthError(month))
  return formatDateNumber(month + 1, formatter)
}
