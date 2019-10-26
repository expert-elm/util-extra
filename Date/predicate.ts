import { assertInteger, isZero } from '../Number/predicate'
import { getDateDiff, DateDiffType } from './compute'

/**
 * test a value is Date object type
 * @param value value
 */
export function isDate(value: any): value is Date {
  return '[object Date]' === toString.call(value)
}

/**
 * test a date is invalid date
 * @param date date
 */
export function isInvalidDate(date: Date): boolean {
  return Number.isNaN(date.getTime())
}

/**
 * assert a date is not invalid date
 * @param date date
 */
export function assertNonInvalidDate(date: Date): void {
  if(isInvalidDate(date)) throw new Error('date was invalid date')
}

/**
 * test a date years is leap year
 * @param date date
 */
export function isLeapYear(date: Date): boolean {
  assertNonInvalidDate(date)
  const year: number = date.getFullYear()
  const isDivintBy4: boolean = year % 4 === 0
  const isDivintBy100: boolean = year % 100 === 0
  return false
    || isDivintBy4 && !isDivintBy100
    || isDivintBy4 && isDivintBy100 && year % 400 === 0
}

//#region date, month, day, hour, minute, second
export function isValidMonthNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 0 && month <= 11) return true
  return false
}

export function assertMonthNumber(month: number): void {
  if(!isValidMonthNumber(month)) throw new Error('Invalid month number ' + month)
}

export function isValidDateNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 1 && month <= 31) return true
  return false
}

export function assertDateNumber(month: number): void {
  if(!isValidDateNumber(month)) throw new Error('Invalid date number ' + month)
}

export function isValidWeekDayNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 0 && month <= 6) return true
  return false
}

export function assertWeekDayNumber(month: number): void {
  if(!isValidWeekDayNumber(month)) throw new Error('Invalid day number ' + month)
}

export function isValidSecondNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 0 && month <= 59) return true
  return false
}

export function assertSecondNumber(month: number): void {
  if(!isValidSecondNumber(month)) throw new Error('Invalid second number ' + month)
}

export function isValidMinuteNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 0 && month <= 59) return true
  return false
}

export function assertMinuteNumber(month: number): void {
  if(!isValidMinuteNumber(month)) throw new Error('Invalid minute number ' + month)
}

export function isValidHourNumber(month: number): boolean {
  assertInteger(month)
  if(month >= 0 && month <= 23) return true
  return false
}

export function assertHourNumber(month: number): void {
  if(!isValidHourNumber(month)) throw new Error('Invalid hour number ' + month)
}
//#endregion

/**
 * test two date object have same date value
 * @param dateA date A
 * @param dateB date B
 */
export function areSameDate(dateA: Date, dateB:Date): boolean {
  return isZero(getDateDiff(dateA, dateB, { type: DateDiffType.Date }))
}
