import { makeInvalidMonthError } from "./makeError"

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

type MonthNames = { [K in Month]: string }

export const MonthName: MonthNames = {
  [Month.January]: `January`,
  [Month.February]: `February`,
  [Month.March]: `March`,
  [Month.April]: `April`,
  [Month.May]: `May`,
  [Month.June]: `June`,
  [Month.July]: `July`,
  [Month.August]: `August`,
  [Month.September]: `September`,
  [Month.October]: `October`,
  [Month.November]: `November`,
  [Month.December]: `December`
}

export const MonthShortName: MonthNames = {
  [Month.January]: `Jan`,
  [Month.February]: `Feb`,
  [Month.March]: `Mar`,
  [Month.April]: `Apr`,
  [Month.May]: `May`,
  [Month.June]: `Jun`,
  [Month.July]: `Jul`,
  [Month.August]: `Aug`,
  [Month.September]: `Sep`,
  [Month.October]: `Oct`,
  [Month.November]: `Nov`,
  [Month.December]: `Dec`
}

export default function toMonth(date: Date, short: boolean = false): string {
  const month: number = date.getMonth()
  const names = short ? MonthShortName : MonthName
  const ret: string | undefined = names[month as Month]
  if(undefined === ret) throw makeInvalidMonthError(month)
  return ret
}
