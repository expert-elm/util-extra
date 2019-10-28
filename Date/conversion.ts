import { assertNever, isUndefined } from '../Null/predicate'
import { toPrependZero, toNumeralString } from '../Number/conversion'
import { assertNonInvalidDate } from './predicate'
import { getHourOfTimezone, getQuarterOfYear, get12HoursOfDate, getDateOfYear, getMonthDays } from './compute'
import { WeekDay, TimezoneFormat, WeekDayNames, MonthNames, MiddayNames, DateConstant, Month } from './constant'
import { isFunction } from '../function/predicate'

//#region toDateString
export enum DateNumberFormat {
  Normal,
  PadZero,
  Numeral
}

function formatDateNumber(number: number, format: DateNumberFormat | ((number: number) => string) = DateNumberFormat.Normal): string {
  if(isFunction<string>(format)) return format(number)
  switch(format) {
    case DateNumberFormat.Normal: return number.toString()
    case DateNumberFormat.PadZero: return toPrependZero(number, 2)
    case DateNumberFormat.Numeral: return toNumeralString(number)
    default: assertNever(format as never)
  }
}

export enum DateNameFormat {
  Normal,
  Short,
  Shorter
}

function formatDateName<T extends { [key: number]: string }>(name: number, names: T, format: DateNameFormat): string {
  const str = names[name]
  switch(format) {
    case DateNameFormat.Normal: return str
    case DateNameFormat.Short: return str.substring(0, 3)
    case DateNameFormat.Shorter: return str.substring(0, 2)
    default: throw assertNever(format)
  }
}

export function toDateYearString(date: Date, { short = false }: ToDateYearStringOptions = {}): string {
  assertNonInvalidDate(date)
  const year: string = date.getFullYear().toString()
  if(false === short) return year
  return year.substring(2)
}

export interface ToDateYearStringOptions {
  readonly short?: boolean
}

export function toDateWeekDayString(date: Date, { format = DateNameFormat.Normal, text = {} }: ToDateWeekDayStringOptions = {}): string {
  assertNonInvalidDate(date)
  const weekDay: WeekDay = date.getDay()
  return text[weekDay] || formatDateName(weekDay, WeekDayNames, format)
}

export interface ToDateWeekDayStringOptions {
  readonly format?: DateNameFormat.Normal | DateNameFormat.Short
  readonly text?: Partial<typeof WeekDayNames>
}

export function toDateTimezoneString(date: Date, { format = TimezoneFormat.Hour }: ToDateTimezoneStringOptions = {}): number | string {
  assertNonInvalidDate(date)
  const hour = getHourOfTimezone(date)
  const sym = hour < 0 ? `-` : `+`
  const hourStr = toPrependZero(Math.abs(hour), 2)
  switch(format) {
    case TimezoneFormat.Hour: return hour
    case TimezoneFormat.ISO8601: return sym + hourStr + `:00`
    case TimezoneFormat.RFC2822: return sym + hourStr + `00`
  }
}

export interface ToDateTimezoneStringOptions {
  readonly format?: TimezoneFormat
}

export function toDateQuarterString(date: Date, { format = DateNumberFormat.Normal }: ToDateQuarterStringOptions = {}): string {
  const quarter = getQuarterOfYear(date)
  return formatDateNumber(quarter + 1, format)
}

interface ToDateQuarterStringOptions {
  readonly format?: DateNumberFormat
}

export function toDateMonthNumberString(date: Date, { format = DateNumberFormat.Normal }: ToDateMonthNumberStringOptions = {}): string {
  assertNonInvalidDate(date)
  const month = date.getMonth()
  return formatDateNumber(month + 1, format)
}

export interface ToDateMonthNumberStringOptions {
  readonly format?: DateNumberFormat
}

export function toDateMonthString(date: Date, { format = DateNameFormat.Normal, text = {} }: ToDateMonthStringOptions = {}): string {
  assertNonInvalidDate(date)
  const month: Month = date.getMonth()
  return text[month] ?? formatDateName(month, MonthNames, format)
}

export interface ToDateMonthStringOptions {
  readonly format?: DateNameFormat
  readonly text?: Partial<typeof MonthNames>
}

export function toDateMiddayString(date: Date, { lowercase = false, text = {} }: ToDateMiddayStringOptions = {}): string {
  assertNonInvalidDate(date)
  const [, midday ] = get12HoursOfDate(date)
  return text[midday] || lowercase ? MiddayNames[midday].toLocaleLowerCase() : MiddayNames[midday]
}

export interface ToDateMiddayStringOptions {
  readonly lowercase?: boolean
  readonly text?: Partial<typeof MiddayNames>
}
//#endregion

//#region toDateJson
type DateJson = {
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  second: string,
  millisecond: string
}

export function toDateJson(date: Date): DateJson {
  assertNonInvalidDate(date)
  return {
    year: toDateYearString(date),
    month: toDateMonthNumberString(date),
    day: toPrependZero(date.getDate(), 2),
    hour: toPrependZero(date.getHours(), 2),
    minute: toPrependZero(date.getMinutes(), 2),
    second: toPrependZero(date.getSeconds(), 2),
    millisecond: toPrependZero(date.getMilliseconds(), 3)
  }
}
//#endregion

//#region format
export function formatDate(date: Date, format: string, text: { [key: number]: string } = {}): string {
  assertNonInvalidDate(date)
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
  [Token.YYYY]: date => toDateYearString(date),
  [Token.YY]: date => toDateYearString(date, { short: true }),
  [Token.MMMM]: (date, text) => toDateMonthString(date, { text }),
  [Token.MMM]: (date, text) => toDateMonthString(date, { format: DateNameFormat.Short, text }),
  [Token.MM]: date => toDateMonthNumberString(date, { format: DateNumberFormat.PadZero }),
  [Token.Mo]: date => toDateMonthNumberString(date, { format: DateNumberFormat.Numeral }),
  [Token.M]: date => toDateMonthNumberString(date),
  [Token.QQ]: date => toDateQuarterString(date, { format: DateNumberFormat.PadZero }),
  [Token.Qo]: date => toDateQuarterString(date, { format: DateNumberFormat.Numeral }),
  [Token.Q]: date => toDateQuarterString(date),
  [Token.DDDD]: date => toPrependZero(getDateOfYear(date), 3),
  [Token.DDDo]: date => toNumeralString(getDateOfYear(date)),
  [Token.DDD]: date => getDateOfYear(date).toString(),
  [Token.DD]: date => toPrependZero(date.getDate(), 2),
  [Token.Do]: date => toNumeralString(date.getDate()),
  [Token.D]: date => date.getDate().toString(),
  [Token.dddd]: date => toDateWeekDayString(date),
  [Token.ddd]: (date, text) => toDateWeekDayString(date, { format: DateNameFormat.Short, text }),
  [Token.dd]: (date, text) => toDateWeekDayString(date, { format: DateNameFormat.Short, text }),
  [Token.do]: date => toNumeralString(date.getDay()),
  [Token.d]: date => date.getDay().toString(),
  [Token.ww]: date => toPrependZero(getDateOfYear(date), 2),
  [Token.wo]: date => toNumeralString(getDateOfYear(date)),
  [Token.w]: date => getDateOfYear(date).toString(),
  [Token.A]: (date, text) => toDateMiddayString(date, { text }),
  [Token.a]: (date, text) => toDateMiddayString(date, { lowercase: true, text }),
  [Token.HH]: date => toPrependZero(date.getHours(), 2),
  [Token.H]: date => date.getHours().toString(),
  [Token.hh]: date => toPrependZero(get12HoursOfDate(date)[0], 2),
  [Token.h]: date => get12HoursOfDate(date)[0].toString(),
  [Token.mm]: date => toPrependZero(date.getMinutes(), 2),
  [Token.m]: date => date.getMinutes().toString(),
  [Token.ss]: date => toPrependZero(date.getSeconds(), 2),
  [Token.s]: date => date.getSeconds().toString(),
  [Token.SSS]: date => toPrependZero(date.getMilliseconds(), 3),
  [Token.SS]: date => toPrependZero(date.getMilliseconds(), 3).substring(2),
  [Token.S]: date => toPrependZero(date.getMilliseconds(), 3).substring(1),
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
    if(!isUndefined(token)) {
      for(let i = 0; i < len; i++) {
        stack.pop()
      }
    }

    if(stack.length) {
      const str = stack.join('')
      tokens.push([Token.String, () => str])
    }

    if(!isUndefined(token)) {
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

export function toCalendar<T extends DayResult>(date: Date, options?: ToCalendarOptions<DayResult, T>): DayResult[]
export function toCalendar<T extends MonthResult>(date: Date, options?: ToCalendarOptions<MonthResult, T>): MonthResult[]
export function toCalendar<T extends YearResult>(date: Date, options?: ToCalendarOptions<YearResult, T>): YearResult[]
export function toCalendar(date: Date, options: ToCalendarOptions<any, any> = {}) {
  assertNonInvalidDate(date)
  const today: Date = new Date
  
  switch(options.type) {
    case CalendarDataType.Day: return renderDays(date, today, options)
    case CalendarDataType.Month: return renderMonths(date, today, options)
    case CalendarDataType.Year: return renderYears(date, today, options)
    default: assertNever(options.type as never)
  }
}

function renderDays<T extends DayResult>(date: Date, today: Date, options: ToCalendarOptions<DayResult, T> = {}): DayResult[] {
  assertNonInvalidDate(date)

  const { 
    // type = Type.Day, 
    // view = View.Single
    weekStart = WeekDay.Sunday
  } = options
  
  const dateTimestamp: number = date.getTime()
  const todayTimestamp: number = today.getTime()
  const monthDays: number = getMonthDays(date)
  const fstDay: Date = new Date(date.setDate(1))
  const fstMonthTimestamp: number = fstDay.getTime()
  const lstMonthTimestamp: number = fstMonthTimestamp + (monthDays - 1) * DateConstant.DaySeconds

  const fstDayOfWeek: number = fstDay.getDay()
  const fstDayTimestamp = fstDay.setDate((fstDayOfWeek - 1) * -1)

  return Array(42).fill(0).map((_, i) => {
    const timestamp: number = fstDayTimestamp + DateConstant.DaySeconds * (weekStart + i)
    const date = new Date(timestamp)
    const dayOffset: number = Math.ceil((timestamp - dateTimestamp) / DateConstant.DaySeconds)
    const monthOffset: number = calcMonthOffset(timestamp)
    const todayOffset: number = Math.ceil((timestamp - todayTimestamp) / DateConstant.DaySeconds)

    return {
      date,
      dayOffset,
      monthOffset,
      todayOffset
    }
  })


  function calcMonthOffset(timestamp: number): Offset {
    if(timestamp < fstMonthTimestamp) return Offset.Prev
    else if(timestamp > lstMonthTimestamp) return Offset.Next
    return Offset.Curr
  }
}

function renderMonths<T extends MonthResult>(date: Date, today: Date, options: ToCalendarOptions<MonthResult, T> = {}): MonthResult[] {
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
    const date = new Date(`${year + offset}-${toPrependZero(number, 2)}`)
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

function renderYears<T extends YearResult>(date: Date, today: Date, options: ToCalendarOptions<YearResult, T> = {}): YearResult[] {
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
