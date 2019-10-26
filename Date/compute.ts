import { DateConstant, Quarter, Midday } from './constant'
import { assertNever } from '../Null/predicate'
import { assertNonInvalidDate, isLeapYear, assertMonthNumber, assertHourNumber } from './predicate'

//#region dateAgo

const DATEAGO_FLAGS: ReadonlyArray<[number, DateAgoText]> = [
  [DateConstant.DaySeconds * 365, DateAgoText.Year],
  [DateConstant.DaySeconds * 30,  DateAgoText.Month],
  [DateConstant.WeekDaySeconds, DateAgoText.Week],
  [DateConstant.DaySeconds, DateAgoText.Day],
  [DateConstant.HourSeconds, DateAgoText.Hour],
  [DateConstant.MinutsSeconds, DateAgoText.Minute],
  [DateConstant.MillisecondsOfSecond, DateAgoText.Second]
]

export const enum DateAgoText {
  Ago ='ago',
  JustNow = 'just now',
  Second = 'sec',
  Minute = 'min',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

/**
 * compute date ago from now
 * 
 * @param date compare date
 * @param options AgoOptions
 */
export function getDateAgo(date: Date, { from = new Date, render = dateAgoRender, text = {} }: DateAgoOptions = {}): string {
  const diff: number = from.getTime() - date.getTime()
  if(diff < 0) throw new Error('date after from')

  for(let i = 0; i < DATEAGO_FLAGS.length; i++) {
    const [ ms, agotext ] = DATEAGO_FLAGS[i]
    if(diff / ms >= 1) {
      const num: number = diff / ms | 0
      const desc = text[agotext] || agotext
      return render(num, desc, text)
    }
  }

  return text[DateAgoText.JustNow] || DateAgoText.JustNow
}

function dateAgoRender(num: number, desc: string, text: DateAgoOptions['text'] = {}): string {
  const str = num > 1 ? num.toString() : 'a'
  const fmt = desc + (num > 1 ? 's' : '')
  const ago = text[DateAgoText.Ago] || DateAgoText.Ago
  return [ str, fmt, ago ].join(' ')
}

/**
 * dateAgo options
 */
export interface DateAgoOptions {
  /**
   * which date from, default to `now()`
   */
  readonly from?: Date
  /**
   * render template function, default to `$1 $2 ago`
   */
  readonly render?: (number: number, description: string, text: DateAgoOptions['text']) => string
  /**
   * text map for render
   */
  readonly text?: { [K in DateAgoText]?: string }
}

//#endregion

//#region getDiff

export const enum DateDiffType {
  Millisecond,
  Second,
  Minute,
  Hour,
  Date,
  WeekDay,
  Month,
  Year
}

/**
 * compute diff from `dateA - dateB`
 * @param dateA date a
 * @param dateB date b
 * @param options DateDiffOptions
 */
export function getDateDiff(dateA: Date, dateB: Date, { type = DateDiffType.Millisecond, truncate = true }: DateDiffOptions = {}): number {
  const num = mapUnitToMilliseconds(type)
  const x1 = dateA.getTime()
  const x2 = dateB.getTime()
  const diff = (x1 - x2) / num
  return truncate ? diff | 0 : diff
}

/**
 * dateDiff options
 */
export interface DateDiffOptions {
  /**
   * only integer part
   */
  readonly truncate?: boolean
  /**
   * diff type
   */
  readonly type?: DateDiffType
}

function mapUnitToMilliseconds(type: DateDiffType): number {
  switch(type) {
    case DateDiffType.Millisecond: return 1
    case DateDiffType.Second: return DateConstant.MillisecondsOfSecond
    case DateDiffType.Minute: return DateConstant.MinutsSeconds
    case DateDiffType.Hour: return DateConstant.HourSeconds
    case DateDiffType.Date: return DateConstant.DaySeconds
    case DateDiffType.WeekDay: return DateConstant.WeekDaySeconds
    case DateDiffType.Month: return DateConstant.DaySeconds * 30
    case DateDiffType.Year: return DateConstant.DaySeconds * 30 * DateConstant.MonthsOfYear
    default: assertNever(type)
  }
}

//#endregion

//#region getSomethingOfYear
const enum DateOfYearBase {
  Millisecond = 1,
  Second = DateConstant.Seconds,
  Hour = DateConstant.HourSeconds,
  Minute = DateConstant.MinutsSeconds,
  Date = DateConstant.DaySeconds,
  WeekDay = DateConstant.WeekDaySeconds
}

function ofYear(base: DateOfYearBase = DateOfYearBase.Date) {
  return (date: Date): number => {
    assertNonInvalidDate(date)
    const year = date.getFullYear()
    const timestamp = date.getTime()

    return Math.floor(
      (timestamp - Date.parse(year.toString())) / base
    )
  }
}

/** 
 * get millisecond of that year of date object 
 * @param date date
 */
export const getMillisecondOfYear = ofYear(DateOfYearBase.Millisecond)
/** 
 * get second of that year of date object
 * @param date date
 */
export const getSecondOfYear = ofYear(DateOfYearBase.Second)
/** 
 * get minute of that year of date object
 * @param date date
 */
export const getMinuteOfYear = ofYear(DateOfYearBase.Minute)
/** 
 * get hour of that year of date object
 * @param date date
 */
export const getHourOfYear = ofYear(DateOfYearBase.Hour)
/** 
 * get weekday of that year of date object
 * @param date date
 */
export const getWeekDayOfYear = ofYear(DateOfYearBase.WeekDay)
/** 
 * get date of that year of date object
 * @param date date
 */
export const getDateOfYear = ofYear(DateOfYearBase.Date)
/** 
 * get quarter of that year of date object
 * @param date date
 */
export function getQuarterOfYear(date: Date): number {
  assertNonInvalidDate(date)
  const month = date.getMonth()
  switch(month) {
    case 0:
    case 1:
    case 2: return Quarter.First
    case 3:
    case 4:
    case 5: return Quarter.Second
    case 6:
    case 7: 
    case 8: return Quarter.Third
    case 9:
    case 10:
    case 11: return Quarter.Fourth
    default: assertNever(month as never)
  }
}
//#endregion

//#region getSomeASomeB
/**
 * get dates of month from date object
 * @param date date
 */
export function getMonthDays(date: Date): number {
  assertNonInvalidDate(date)
  const month = date.getMonth()
  assertMonthNumber(date.getMonth())
  switch(month + 1) {
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
    default: assertNever(month as never)
  }
}


export function get12HoursOfDate(date: Date): [ number, Midday ] {
  assertNonInvalidDate(date)
  const hours = date.getHours()
  assertHourNumber(hours)
  const midday = hours > 12 ? Midday.PM : Midday.AM
  return [ hours % 12, midday ]
}

export function getHourOfTimezone(date: Date): number {
  assertNonInvalidDate(date)
  return date.getTimezoneOffset() / 60 * -1
}

//#endregion
