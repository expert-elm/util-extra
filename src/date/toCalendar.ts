import { DAY_SECONDS } from "./constant"
import { WeekDay } from "./toWeekDay"
import getDaysOfMonth from "./getDaysOfMonth"
import assertInvalidDate from "./assertInvalidDate"
import toPadZero from "../number/toPadZero"

export const enum Type {
  Day,
  Month,
  Year,
  HundredYear
}

export const enum View {
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

export type DayResult = {
  date: Date,
  dayOffset: number,
  monthOffset: Offset,
  todayOffset: number
}

export type MonthResult = {
  date: Date,
  monthOffset: number,
  yearOffset: Offset,
  thisMonthOffset: number
}

export type YearResult = {
  date: Date,
  yearOffset: number,
  thisYearOffset: number
}

export interface CalendarOptions<T, E extends T> {
  type?: Type,
  view?: View,
  weekStart?: WeekDay,
  callback?(result: T): E
}

export default function toCalendar<T extends DayResult>(date: Date, type: Type.Day, options?: CalendarOptions<DayResult, T>): DayResult[]
export default function toCalendar<T extends MonthResult>(date: Date, type: Type.Month, options?: CalendarOptions<MonthResult, T>): MonthResult[]
export default function toCalendar<T extends YearResult>(date: Date, type: Type.Year, options?: CalendarOptions<YearResult, T>): YearResult[]
export default function toCalendar(date: Date, type: Type, options = {}) {
  assertInvalidDate(date)
  const today: Date = new Date
  
  switch(type) {
    case Type.Day: return renderDays(date, today, options)
    case Type.Month: return renderMonths(date, today, options)
    case Type.Year: return renderYears(date, today, options)
    default: throw new Error(`Unknown type "${type}"`)
  }
}

function renderDays<T extends DayResult>(date: Date, today: Date, options: CalendarOptions<DayResult, T> = {}): DayResult[] {
  assertInvalidDate(date)

  const { 
    // type = Type.Day, 
    // view = View.Single
    weekStart = WeekDay.Sunday
  } = options
  
  const dateTimestamp: number = date.getTime()
  const todayTimestamp: number = today.getTime()
  const monthDays: number = getDaysOfMonth(date)
  const fstDay: Date = new Date(date.setDate(1))
  const fstMonthTimestamp: number = fstDay.getTime()
  const lstMonthTimestamp: number = fstMonthTimestamp + (monthDays - 1) * DAY_SECONDS

  const fstDayOfWeek: number = fstDay.getDay()
  const fstDayTimestamp = fstDay.setDate((fstDayOfWeek - 1) * -1)

  return Array(42).fill(0).map((_, i) => {
    const timestamp: number = fstDayTimestamp + DAY_SECONDS * (weekStart + i)
    const date = new Date(timestamp)
    const dayOffset: number = Math.ceil((timestamp - dateTimestamp) / DAY_SECONDS)
    const monthOffset: number = calcMonthOffset(timestamp)
    const todayOffset: number = Math.ceil((timestamp - todayTimestamp) / DAY_SECONDS)

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

function renderMonths<T extends MonthResult>(date: Date, today: Date, options: CalendarOptions<MonthResult, T> = {}): MonthResult[] {
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
    const date = new Date(`${year + offset}-${toPadZero(number, 2)}`)
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

function renderYears<T extends YearResult>(date: Date, today: Date, options: CalendarOptions<YearResult, T> = {}): YearResult[] {
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
