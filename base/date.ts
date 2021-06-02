import { is_function } from './function'
import { prepend_zero, to_numeral_string } from './number'
import { is_undefined } from './undefined'
import { throw_never } from './never'

export const enum DateConstant {
  MillisecondsOfSecond = 1000,
  SecondsOfMinute = 60,
  MinutesOfHour = 60,
  HoursOfDay = 24,
  MonthsOfYear = 12,
  DaysOfWeek = 7,
  DaysOfYear = 365,
  DaysOfLeapYear = DaysOfYear + 1,
  WeeksOfMonth = 4,
  WeeksOfYear = 52,
  QuartersOfYear = 4,
  Seconds = MillisecondsOfSecond,
  MinutsSeconds = MillisecondsOfSecond * SecondsOfMinute,
  HourSeconds = MinutsSeconds * MinutesOfHour,
  DaySeconds = HourSeconds * HoursOfDay,
  WeekDaySeconds = DaySeconds * DaysOfWeek,
  MaxTimestamp = 8640000000000000,
  MinTimestamp = -8640000000000000,
}

export const enum DateUnit {
  Millisecond,
  Second,
  Minute,
  Hour,
  Date,
  WeekDay,
  Month,
  Year,
}

export const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export const enum TimezoneFormat {
  Hour,
  ISO8601,
  RFC2822
}

export const enum Quarter {
  First,
  Second,
  Third,
  Fourth
}

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

export const enum Midday {
  AM,
  PM
}

export const WeekDayNames: { [K in WeekDay]: string } = {
  [WeekDay.Sunday]: 'Sunday',
  [WeekDay.Monday]: 'Monday',
  [WeekDay.Tuesday]: 'Tuesday',
  [WeekDay.Wednesday]: 'Wednesday',
  [WeekDay.Thursday]: 'Thursday',
  [WeekDay.Friday]: 'Friday',
  [WeekDay.Saturday]: 'Saturday'
}

export const MonthNames: { [K in Month]: string } = {
  [Month.January]: 'January',
  [Month.February]: 'February',
  [Month.March]: 'March',
  [Month.April]: 'April',
  [Month.May]: 'May',
  [Month.June]: 'June',
  [Month.July]: 'July',
  [Month.August]: 'August',
  [Month.September]: 'September',
  [Month.October]: 'October',
  [Month.November]: 'November',
  [Month.December]: 'December'
}

export const MiddayNames: { [K in Midday]: string } = {
  [Midday.AM]: 'AM',
  [Midday.PM]: 'PM'
}

import { object_type } from './object'

/**
 * Test value is Date
 * 
 * @param value value
 */
 export function is_date(value: any): value is Date {
  return 'Date' === object_type(value)
}

/**
 * Test date is a invalid date
 * 
 * @param date date
 */
export function is_invalid_date(date: Date): boolean {
  return Number.isNaN(date.getTime())
}

/**
 * Assert a date is not invalid date
 * @param date date
 */
export function assert_non_invalid_date(date: Date): void {
  if(is_invalid_date(date)) throw new Error('date was invalid date')
}

/**
 * Test a date years is leap year
 * @param date date
 */
export function is_leap_year(date: Date): boolean {
  assert_non_invalid_date(date)
  
  const year: number = date.getFullYear()
  const is_divint_by_4: boolean = year % 4 === 0
  const is_divint_by_100: boolean = year % 100 === 0

  return false
    || is_divint_by_4 && !is_divint_by_100
    || is_divint_by_4 && is_divint_by_100 && year % 400 === 0
}

//#region date, month, day, hour, minute, second
export function is_valid_month_number(month: number): boolean {
  if(month >= 0 && month <= 11) return true
  return false
}

export function assert_month_number(month: number): void {
  if(!is_valid_month_number(month)) throw new Error('Invalid month number ' + month)
}

export function is_valid_date_number(month: number): boolean {
  if(month >= 1 && month <= 31) return true
  return false
}

export function assert_date_number(month: number): void {
  if(!is_valid_date_number(month)) throw new Error('Invalid date number ' + month)
}

export function is_valid_weekday_number(month: number): boolean {
  if(month >= 0 && month <= 6) return true
  return false
}

export function assert_weekday_number(month: number): void {
  if(!is_valid_weekday_number(month)) throw new Error('Invalid day number ' + month)
}

export function is_valid_second_number(month: number): boolean {
  if(month >= 0 && month <= 59) return true
  return false
}

export function assert_second_number(month: number): void {
  if(!is_valid_second_number(month)) throw new Error('Invalid second number ' + month)
}

export function is_valid_minute_number(month: number): boolean {
  if(month >= 0 && month <= 59) return true
  return false
}

export function assert_minute_number(month: number): void {
  if(!is_valid_minute_number(month)) throw new Error('Invalid minute number ' + month)
}

export function is_valid_hour_number(month: number): boolean {
  if(month >= 0 && month <= 23) return true
  return false
}

export function assert_hour_number(month: number): void {
  if(!is_valid_hour_number(month)) throw new Error('Invalid hour number ' + month)
}
//#endregion

/**
 * test two date object have same date value
 * @param dateA date A
 * @param dateB date B
 */
export function are_same_date(dateA: Date, dateB:Date): boolean {
  return 0 === diff_date(dateA, dateB, { type: DateUnit.Date })
}

//#region dateAgo

const DATEAGO_FLAGS: ReadonlyArray<[number, DateAgoText]> = [
  [DateConstant.DaySeconds * 365,     DateAgoText.Year],
  [DateConstant.DaySeconds * 30,      DateAgoText.Month],
  [DateConstant.WeekDaySeconds,       DateAgoText.Week],
  [DateConstant.DaySeconds,           DateAgoText.Day],
  [DateConstant.HourSeconds,          DateAgoText.Hour],
  [DateConstant.MinutsSeconds,        DateAgoText.Minute],
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
 * Compute date ago from now
 * 
 * @param date compare date
 * @param options AgoOptions
 */
export function ago(date: Date, { from = new Date, render = render_ago, text = {} }: AgoOptions = {}): string {
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

function render_ago(num: number, desc: string, text: AgoOptions['text'] = {}): string {
  const str = num > 1 ? num.toString() : 'a'
  const fmt = desc + (num > 1 ? 's' : '')
  const ago = text[DateAgoText.Ago] || DateAgoText.Ago
  return [ str, fmt, ago ].join(' ')
}

/**
 * dateAgo options
 */
export interface AgoOptions {
  /**
   * which date from, default to `now()`
   */
  readonly from?: Date
  /**
   * render template function, default to `$1 $2 ago`
   */
  readonly render?: (number: number, description: string, text: AgoOptions['text']) => string
  /**
   * text map for render
   */
  readonly text?: { [K in DateAgoText]?: string }
}

//#endregion

//#region getDiff

/**
 * compute diff from `dateA - dateB`
 * @param dateA date a
 * @param dateB date b
 * @param options DateDiffOptions
 */
export function diff_date(dateA: Date, dateB: Date, { type = DateUnit.Millisecond, truncate = true }: DateDiffOptions = {}): number {
  const num = calc_milliseconds(type)
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
  readonly type?: DateUnit
}

function calc_milliseconds(type: DateUnit): number {
  switch(type) {
    case DateUnit.Millisecond: return 1
    case DateUnit.Second:      return DateConstant.MillisecondsOfSecond
    case DateUnit.Minute:      return DateConstant.MinutsSeconds
    case DateUnit.Hour:        return DateConstant.HourSeconds
    case DateUnit.Date:        return DateConstant.DaySeconds
    case DateUnit.WeekDay:     return DateConstant.WeekDaySeconds
    case DateUnit.Month:       return DateConstant.DaySeconds * 30
    case DateUnit.Year:        return DateConstant.DaySeconds * 30 * DateConstant.MonthsOfYear
    default: throw_never(type)
  }
}

//#endregion

//#region of year
const enum DateOfYearBase {
  Millisecond = 1,
  Second = DateConstant.Seconds,
  Hour = DateConstant.HourSeconds,
  Minute = DateConstant.MinutsSeconds,
  Date = DateConstant.DaySeconds,
  WeekDay = DateConstant.WeekDaySeconds
}

function of_year_factory(base: DateOfYearBase = DateOfYearBase.Date) {
  return (date: Date): number => {
    assert_non_invalid_date(date)
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
export const get_millisecond_of_year = of_year_factory(DateOfYearBase.Millisecond)
/** 
 * get second of that year of date object
 * @param date date
 */
export const get_second_of_year = of_year_factory(DateOfYearBase.Second)
/** 
 * get minute of that year of date object
 * @param date date
 */
export const get_minute_of_year = of_year_factory(DateOfYearBase.Minute)
/** 
 * get hour of that year of date object
 * @param date date
 */
export const get_hour_of_year = of_year_factory(DateOfYearBase.Hour)
/** 
 * get weekday of that year of date object
 * @param date date
 */
export const get_weekday_of_year = of_year_factory(DateOfYearBase.WeekDay)
/** 
 * get date of that year of date object
 * @param date date
 */
export const get_date_of_year = of_year_factory(DateOfYearBase.Date)
/** 
 * get quarter of that year of date object
 * @param date date
 */
export function get_quarter_of_year(date: Date): number {
  assert_non_invalid_date(date)
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
    default: throw_never(month as never)
  }
}
//#endregion

//#region getSomeASomeB
/**
 * Get dates of month from date object
 * @param date date
 */
export function get_month_days(date: Date): number {
  assert_non_invalid_date(date)
  const month = date.getMonth()
  assert_month_number(date.getMonth())
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
    case 2: return is_leap_year(date) ? 29 : 28
    default: throw_never(month as never)
  }
}


export function get_12_hours_of_date(date: Date): [ number, Midday ] {
  assert_non_invalid_date(date)
  const hours = date.getHours()
  assert_hour_number(hours)
  const midday = hours > 12 ? Midday.PM : Midday.AM
  return [ hours % 12, midday ]
}

export function get_hour_of_timezone(date: Date): number {
  assert_non_invalid_date(date)
  return date.getTimezoneOffset() / 60 * -1
}

//#endregion

//#region toDateString
export enum DateNumberFormat {
  Normal,
  PadZero,
  Numeral
}

function format_date_number(number: number, format: DateNumberFormat | ((number: number) => string) = DateNumberFormat.Normal): string {
  if(is_function<string>(format)) return format(number)
  switch(format) {
    case DateNumberFormat.Normal: return number.toString()
    case DateNumberFormat.PadZero: return prepend_zero(number, 2)
    case DateNumberFormat.Numeral: return to_numeral_string(number)
    default: throw_never(format as never)
  }
}

export enum DateNameFormat {
  Normal,
  Short,
  Shorter
}

function format_date_name<T extends { [key: number]: string }>(name: number, names: T, format: DateNameFormat): string {
  const str = names[name]
  switch(format) {
    case DateNameFormat.Normal: return str
    case DateNameFormat.Short: return str.substring(0, 3)
    case DateNameFormat.Shorter: return str.substring(0, 2)
    default: throw throw_never(format)
  }
}

export function to_date_year_string(date: Date, { short = false }: ToDateYearStringOptions = {}): string {
  assert_non_invalid_date(date)
  const year: string = date.getFullYear().toString()
  if(false === short) return year
  return year.substring(2)
}

export interface ToDateYearStringOptions {
  readonly short?: boolean
}

export function to_date_weekday_string(date: Date, { format = DateNameFormat.Normal, text = {} }: ToDateWeekDayStringOptions = {}): string {
  assert_non_invalid_date(date)
  const weekDay: WeekDay = date.getDay()
  return text[weekDay] || format_date_name(weekDay, WeekDayNames, format)
}

export interface ToDateWeekDayStringOptions {
  readonly format?: DateNameFormat.Normal | DateNameFormat.Short
  readonly text?: Partial<typeof WeekDayNames>
}

export function to_date_timezone_string(date: Date, { format = TimezoneFormat.Hour }: ToDateTimezoneStringOptions = {}): number | string {
  assert_non_invalid_date(date)
  const hour = get_hour_of_timezone(date)
  const sym = hour < 0 ? `-` : `+`
  const hourStr = prepend_zero(Math.abs(hour), 2)
  switch(format) {
    case TimezoneFormat.Hour: return hour
    case TimezoneFormat.ISO8601: return sym + hourStr + `:00`
    case TimezoneFormat.RFC2822: return sym + hourStr + `00`
  }
}

export interface ToDateTimezoneStringOptions {
  readonly format?: TimezoneFormat
}

export function to_date_quarter_string(date: Date, { format = DateNumberFormat.Normal }: ToDateQuarterStringOptions = {}): string {
  const quarter = get_quarter_of_year(date)
  return format_date_number(quarter + 1, format)
}

interface ToDateQuarterStringOptions {
  readonly format?: DateNumberFormat
}

export function to_date_month_number_string(date: Date, { format = DateNumberFormat.Normal }: ToDateMonthNumberStringOptions = {}): string {
  assert_non_invalid_date(date)
  const month = date.getMonth()
  return format_date_number(month + 1, format)
}

export interface ToDateMonthNumberStringOptions {
  readonly format?: DateNumberFormat
}

export function to_date_month_string(date: Date, { format = DateNameFormat.Normal, text = {} }: ToDateMonthStringOptions = {}): string {
  assert_non_invalid_date(date)
  const month: Month = date.getMonth()
  return text[month] ?? format_date_name(month, MonthNames, format)
}

export interface ToDateMonthStringOptions {
  readonly format?: DateNameFormat
  readonly text?: Partial<typeof MonthNames>
}

export function to_date_midday_string(date: Date, { lowercase = false, text = {} }: ToDateMiddayStringOptions = {}): string {
  assert_non_invalid_date(date)
  const [, midday ] = get_12_hours_of_date(date)
  return text[midday] || lowercase ? MiddayNames[midday].toLocaleLowerCase() : MiddayNames[midday]
}

export interface ToDateMiddayStringOptions {
  readonly lowercase?: boolean
  readonly text?: Partial<typeof MiddayNames>
}
//#endregion

//#region toDateJson
export type DateJson = {
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  second: string,
  millisecond: string
}

export function to_date_json(date: Date): DateJson {
  assert_non_invalid_date(date)
  return {
    year: to_date_year_string(date),
    month: to_date_month_number_string(date),
    day: prepend_zero(date.getDate(), 2),
    hour: prepend_zero(date.getHours(), 2),
    minute: prepend_zero(date.getMinutes(), 2),
    second: prepend_zero(date.getSeconds(), 2),
    millisecond: prepend_zero(date.getMilliseconds(), 3)
  }
}
//#endregion

//#region format
export function formatDate(date: Date, format: string, text: { [key: number]: string } = {}): string {
  assert_non_invalid_date(date)
  return parse(format).map(([,trans]) => trans(date, text)).join('')
}

interface Transformer {
  (date: Date, text: { [key: number]: string }): string
}

const enum Token {
  YYYY,
  YY,
  MMMM,
  MMM,
  MM,
  Mo,
  M,
  QQ,
  Qo,
  Q,
  DDDD,
  DDDo,
  DDD,
  DD,
  Do,
  D,
  dddd,
  ddd,
  dd,
  do,
  d,
  ww,
  wo,
  w,
  A,
  a,
  HH,
  H,
  hh,
  h,
  mm,
  m,
  ss,
  s,
  SSS,
  SS,
  S,
  x,
  X,
  String
}

const transformer: { [K in Token]: Transformer } = {
  [Token.YYYY]: date => to_date_year_string(date),
  [Token.YY]: date => to_date_year_string(date, { short: true }),
  [Token.MMMM]: (date, text) => to_date_month_string(date, { text }),
  [Token.MMM]: (date, text) => to_date_month_string(date, { format: DateNameFormat.Short, text }),
  [Token.MM]: date => to_date_month_number_string(date, { format: DateNumberFormat.PadZero }),
  [Token.Mo]: date => to_date_month_number_string(date, { format: DateNumberFormat.Numeral }),
  [Token.M]: date => to_date_month_number_string(date),
  [Token.QQ]: date => to_date_quarter_string(date, { format: DateNumberFormat.PadZero }),
  [Token.Qo]: date => to_date_quarter_string(date, { format: DateNumberFormat.Numeral }),
  [Token.Q]: date => to_date_quarter_string(date),
  [Token.DDDD]: date => prepend_zero(get_date_of_year(date), 3),
  [Token.DDDo]: date => to_numeral_string(get_date_of_year(date)),
  [Token.DDD]: date => get_date_of_year(date).toString(),
  [Token.DD]: date => prepend_zero(date.getDate(), 2),
  [Token.Do]: date => to_numeral_string(date.getDate()),
  [Token.D]: date => date.getDate().toString(),
  [Token.dddd]: date => to_date_weekday_string(date),
  [Token.ddd]: (date, text) => to_date_weekday_string(date, { format: DateNameFormat.Short, text }),
  [Token.dd]: (date, text) => to_date_weekday_string(date, { format: DateNameFormat.Short, text }),
  [Token.do]: date => to_numeral_string(date.getDay()),
  [Token.d]: date => date.getDay().toString(),
  [Token.ww]: date => prepend_zero(get_date_of_year(date), 2),
  [Token.wo]: date => to_numeral_string(get_date_of_year(date)),
  [Token.w]: date => get_date_of_year(date).toString(),
  [Token.A]: (date, text) => to_date_midday_string(date, { text }),
  [Token.a]: (date, text) => to_date_midday_string(date, { lowercase: true, text }),
  [Token.HH]: date => prepend_zero(date.getHours(), 2),
  [Token.H]: date => date.getHours().toString(),
  [Token.hh]: date => prepend_zero(get_12_hours_of_date(date)[0], 2),
  [Token.h]: date => get_12_hours_of_date(date)[0].toString(),
  [Token.mm]: date => prepend_zero(date.getMinutes(), 2),
  [Token.m]: date => date.getMinutes().toString(),
  [Token.ss]: date => prepend_zero(date.getSeconds(), 2),
  [Token.s]: date => date.getSeconds().toString(),
  [Token.SSS]: date => prepend_zero(date.getMilliseconds(), 3),
  [Token.SS]: date => prepend_zero(date.getMilliseconds(), 3).substring(2),
  [Token.S]: date => prepend_zero(date.getMilliseconds(), 3).substring(1),
  [Token.x]: date => date.getTime().toString(),
  [Token.X]: date => Math.floor(date.getTime() / 1000).toString(),
  [Token.String]: () => `STRING`
}

function parse(input: string): [Token, Transformer][] {
  const tokens: [Token, Transformer][] = []
  const curr = input.split('')
  let stack: string[] = []

  while(curr.length) run()
  return tokens

  function run() {
    switch (true) {
      case match('Y'):
        if(match('Y')) {
          if(match('Y')) {
            if(match('Y')) {
              make(Token.YYYY, 4)
              return
            }
            back()
          }
          make(Token.YY, 2)
          return
        }
        return
      case match('M'):
        if (match('M')) {
          if (match('M')) {
            if (match('M')) {
              make(Token.MMMM, 4)
              return
            }
            make(Token.MMM, 3)
            return
          }
          make(Token.MM, 2)
          return
        } else if (match('o')) {
          make(Token.Mo, 2)
          return
        }
        make(Token.M, 1)
        return
      case match('Q'):
        if(match('Q')) {
          make(Token.QQ, 2)
          return
        } else if(match('o')) {
          make(Token.Qo, 2)
          return
        }
        make(Token.Q, 1)
        return

      case match('D'):
        if(match('D')) {
          if(match('D')) {
            if(match('D')) {
              make(Token.DDDD, 4)
              return
            } else if(match('o')) {
              make(Token.DDDo, 4)
              return
            }
            make(Token.DDD, 3)
            return
          }
          make(Token.DD, 2)
          return
        } else if(match('o')) {
          make(Token.Do, 2)
          return
        }
        make(Token.D, 1)
        return
      case match('d'):
        if(match('d')) {
          if(match('d')) {
            if(match('d')) {
              make(Token.dddd, 4)
              return
            }
            make(Token.ddd, 3)
            return
          }
          make(Token.dd, 2)
          return
        } else if(match('o')) {
          make(Token.do, 2)
          return
        }
        make(Token.d, 1)
        return
      case match('w'):
        if(match('w')) {
          make(Token.ww, 2)
          return
        } else if(match('o')) {
          make(Token.wo, 2)
          return
        }
        make(Token.w, 1)
        return
      case match('A'):
        make(Token.A, 1)
        return
      case match('a'):
        make(Token.a, 1)
        return
      case match('H'):
        if(match('H')) {
          make(Token.HH, 2)
          return
        }
        make(Token.H, 1)
        return
      case match('h'):
        if(match('h')) {
          make(Token.hh, 2)
          return
        }
        make(Token.h, 1)
        return
      case match('m'):
        if(match('m')) {
          make(Token.mm, 2)
          return
        }
        make(Token.m, 1)
        return
      case match('s'):
        if(match('s')) {
          make(Token.ss, 2)
          return
        }
        make(Token.s, 1)
        return
      case match('S'):
        if(match('S')) {
          if(match('S')) {
            make(Token.SSS, 3)
            return
          }
          make(Token.SS, 2)
          return
        }
        make(Token.S, 1)
        return
      case match('X'):
        make(Token.X, 1)
        return
      case match('x'):
        make(Token.x, 1)
        return
      default:
        next()
        return
    }
  }

  function back(): void {
    curr.unshift(stack.pop() as string)
  }

  function next(): string | null {
    const fst = curr.shift()
    if(!fst) {
      return null
    }
    stack.push(fst)
    return fst
  }

  function match(char: string): boolean {
    const nn = next()
    if(nn) {
      if (char === nn) {
        return true
      } else {
        back()
        return false
      }
    } else {
      return false
    }
  }

  function make(token: Token, len: number): void {
    if(!is_undefined(token)) {
      for(let i = 0; i < len; i++) {
        stack.pop()
      }
    }

    if(stack.length) {
      const str = stack.join('')
      tokens.push([Token.String, () => str])
    }

    if(!is_undefined(token)) {
      tokens.push([token, transformer[token]])
    }

    stack = []
  }
}
//#endregion

//#region calendar
export const enum CalendarDataType {
  Day,
  Month,
  Year,
  // HundredYear
}

export const enum CalendarView {
  Single,
  Prev,
  Next,
  Both
}

const enum Offset {
  Prev = -1,
  Curr = 0,
  Next = 1,
}

type DayResult = {
  date: Date,
  dayOffset: number,
  monthOffset: Offset,
  todayOffset: number
}

type MonthResult = {
  date: Date,
  monthOffset: number,
  yearOffset: Offset,
  thisMonthOffset: number
}

type YearResult = {
  date: Date,
  yearOffset: number,
  thisYearOffset: number
}

export interface ToCalendarOptions<T, E extends T> {
  readonly type?: CalendarDataType,
  readonly view?: CalendarView,
  readonly weekStart?: WeekDay,
  readonly callback?: (result: T) => E
}

export function render_calendar<T extends DayResult>(date: Date, options?: ToCalendarOptions<DayResult, T>): DayResult[]
export function render_calendar<T extends MonthResult>(date: Date, options?: ToCalendarOptions<MonthResult, T>): MonthResult[]
export function render_calendar<T extends YearResult>(date: Date, options?: ToCalendarOptions<YearResult, T>): YearResult[]
export function render_calendar(date: Date, options: ToCalendarOptions<any, any> = {}) {
  assert_non_invalid_date(date)
  const today: Date = new Date
  
  switch(options.type) {
    case CalendarDataType.Day: return render_days(date, today, options)
    case CalendarDataType.Month: return render_months(date, today, options)
    case CalendarDataType.Year: return render_years(date, today, options)
    default: throw_never(options.type as never)
  }
}

function render_days<T extends DayResult>(date: Date, today: Date, options: ToCalendarOptions<DayResult, T> = {}): DayResult[] {
  assert_non_invalid_date(date)

  const { 
    // type = Type.Day, 
    // view = View.Single
    weekStart = WeekDay.Sunday
  } = options
  
  const dateTimestamp: number = date.getTime()
  const todayTimestamp: number = today.getTime()
  const monthDays: number = get_month_days(date)
  const fstDay: Date = new Date(date.setDate(1))
  const fstMonthTimestamp: number = fstDay.getTime()
  const lstMonthTimestamp: number = fstMonthTimestamp + (monthDays - 1) * DateConstant.DaySeconds

  const fstDayOfWeek: number = fstDay.getDay()
  const fstDayTimestamp = fstDay.setDate((fstDayOfWeek - 1) * -1)

  return Array(42).fill(0).map((_, i) => {
    const timestamp: number = fstDayTimestamp + DateConstant.DaySeconds * (weekStart + i)
    const date = new Date(timestamp)
    const dayOffset: number = Math.ceil((timestamp - dateTimestamp) / DateConstant.DaySeconds)
    const monthOffset: number = calc_month_offset(timestamp)
    const todayOffset: number = Math.ceil((timestamp - todayTimestamp) / DateConstant.DaySeconds)

    return {
      date,
      dayOffset,
      monthOffset,
      todayOffset
    }
  })


  function calc_month_offset(timestamp: number): Offset {
    if(timestamp < fstMonthTimestamp) return Offset.Prev
    else if(timestamp > lstMonthTimestamp) return Offset.Next
    return Offset.Curr
  }
}

function render_months<T extends MonthResult>(date: Date, today: Date, options: ToCalendarOptions<MonthResult, T> = {}): MonthResult[] {
  const {} = options
  const thisMonth: number = today.getMonth()
  const thisYear: number = today.getFullYear()
  const year = date.getFullYear()
  const month = date.getMonth()
  const yearDiff: number = year - thisYear

  const view: [number, Offset][] = [
    9, 10, 11, 12, 
    1,  2,  3,  4, 
    5,  6,  7,  8, 
    9, 10, 11, 12,
    1,  2,  3,  4
  ].map((month, index) => {
    if(index < 4) return [month, Offset.Prev]
    else if(index > 15) return [month, Offset.Next]
    return [month, Offset.Curr]
  })

  return view.map(([ number, offset ]) => {
    const date = new Date(`${year + offset}-${prepend_zero(number, 2)}`)
    const monthOffset: number = number - 1 - month
    const thisMonthOffset = yearDiff * 12 + number - 1 - thisMonth
    
    return {
      date,
      monthOffset,
      yearOffset: offset,
      thisMonthOffset
    }
  })
}

function render_years<T extends YearResult>(date: Date, today: Date, options: ToCalendarOptions<YearResult, T> = {}): YearResult[] {
  const {} = options
  const thisYear: number = today.getFullYear()
  const year = date.getFullYear()
  const beginYear: number = year - year % 4

  const view: number[] = [
    -8, -7, -6, -5, 
    -4, -3, -2, -1, 
     0,  1,  2,  3, 
     4,  5,  6,  7,
     8,  9, 10, 11
  ].map(offset => {
    return beginYear + offset
  })

  return view.map(number => {
    const date = new Date(number.toString())
    const offset = number - year
    const thisYearOffset = number - thisYear
    
    return {
      date,
      yearOffset: offset,
      thisYearOffset
    }
  })
}

//#endregion
