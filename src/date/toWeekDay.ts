import assertInvalidDate from "./assertInvalidDate"

export const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

type WeekDayNames = { [K in WeekDay]: [string, string, string] }

export const enum WeekFormat {
  Normal,
  Short,
  Shorter
}

export const WeekDayName: WeekDayNames = {
  [WeekDay.Sunday]: [`Sunday`, `Sun`, `Su`],
  [WeekDay.Monday]: [`Monday`, `Mon`, `Mo`],
  [WeekDay.Tuesday]: [`Tuesday`, `Tue`, `Tu`],
  [WeekDay.Wednesday]: [`Wednesday`, `Wed`, `We`],
  [WeekDay.Thursday]: [`Thursday`, `Thu`, `Th`],
  [WeekDay.Friday]: [`Friday`, `Fri`, `Fr`],
  [WeekDay.Saturday]: [`Saturday`, `Sat`, `Sa`]
}

export default function toWeekDay(date: Date, format: WeekFormat = WeekFormat.Normal): string {
  assertInvalidDate(date)
  const week: number = date.getDay()
  const ret: [string, string, string] = WeekDayName[week as WeekDay]
  return ret[format]
}
