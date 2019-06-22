import assertInvalidDate from "./assertInvalidDate"
import isLeapYear from "./isLeapYear"
import { makeInvalidMonthError } from "./makeError"

export default function getMonthDays(date: Date): number {
  assertInvalidDate(date)
  const month: number = date.getMonth() + 1
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: return 31
    case 4:
    case 6:
    case 9:
    case 11: return 30
    case 2: return isLeapYear(date) ? 29 : 28
    default: throw makeInvalidMonthError(month)
  }
}
