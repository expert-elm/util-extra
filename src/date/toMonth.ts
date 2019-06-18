import { makeInvalidMonthError } from "./makeError"
import assertInvalidDate from "./assertInvalidDate"

export const enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

type MonthNames = { [K in Month]: [string, string] }

export const MonthName: MonthNames = {
  [Month.January]: [`January`, `Jan`],
  [Month.February]: [`February`, `Feb`],
  [Month.March]: [`March`, `Mar`],
  [Month.April]: [`April`, `Apr`],
  [Month.May]: [`May`, `May`],
  [Month.June]: [`June`, `Jun`],
  [Month.July]: [`July`, `Jul`],
  [Month.August]: [`August`, `Aug`],
  [Month.September]: [`September`, `Sep`],
  [Month.October]: [`October`, `Oct`],
  [Month.November]: [`November`, `Nov`],
  [Month.December]: [`December`, `Dec`]
}

export default function toMonth(date: Date, short: boolean = false): string {
  assertInvalidDate(date)
  const month: number = date.getMonth()
  const ret: [string, string] | undefined = MonthName[month as Month]
  if(undefined === ret) throw makeInvalidMonthError(month)
  return ret[short ? 0 : 1]
}
