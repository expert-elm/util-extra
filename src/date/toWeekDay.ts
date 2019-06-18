import { makeInvalidWeekdayError } from "./makeError"

export const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

type WeekDayNames = { [K in WeekDay]: string }

export const WeekDayName: WeekDayNames = {
  [WeekDay.Sunday]: `Sunday`,
  [WeekDay.Monday]: `Monday`,
  [WeekDay.Tuesday]: `Tuesday`,
  [WeekDay.Wednesday]: `Wednesday`,
  [WeekDay.Thursday]: `Thursday`,
  [WeekDay.Friday]: `Friday`,
  [WeekDay.Saturday]: `Saturday`
}

export const WeekDayShortName: WeekDayNames = {
  [WeekDay.Sunday]: `Sun`,
  [WeekDay.Monday]: `Mon`,
  [WeekDay.Tuesday]: `Tue`,
  [WeekDay.Wednesday]: `Wed`,
  [WeekDay.Thursday]: `Thu`,
  [WeekDay.Friday]: `Fri`,
  [WeekDay.Saturday]: `Sat`
}

export default function toWeekDay(date: Date, short: boolean = false): string {
  const week: number = date.getDay()
  const names = short ? WeekDayShortName : WeekDayName
  const ret: string | undefined = names[week as WeekDay]
  if(undefined === ret) throw makeInvalidWeekdayError(week)
  return ret
}
