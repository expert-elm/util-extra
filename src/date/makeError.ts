/**
 * @inline
 */
export function makeInvalidMonthError(month: number): Error {
  return new Error(`Invalid month value "${month.toString()}", should between 0 and 11`)
}

/**
 * @inline
 */
export function makeInvaildHoursError(hours: number): Error {
  return new Error(`Invalid hours value "${hours.toString()}", should between 0 and 23`)
}

/**
 * @inline
 */
export function makeInvalidWeekdayError(week: number): Error {
  return new Error(`Invalid weekday value "${week.toString()}", should between 0 and 6`)
}
