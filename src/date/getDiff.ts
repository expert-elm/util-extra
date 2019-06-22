import { DAY_SECONDS, HOUR_SECONDS, MILLISECONDS_OF_SECOND, MINUTE_SECONDS, MONTHS_OF_YEAR, WEEK_SECONDS } from "./constant"
import divint from "../number/divint"

export const enum Unit {
  Millisecond,
  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
  Year
}

export function getDiff(unit: Unit) {
  const num: number = mapUnitToMilliseconds(unit)
  return function diffDateToUnit(date1: Date, date2: Date, truncate: boolean = true): number {
    const x1 = date1.getTime()
    const x2 = date2.getTime()
    const diff = x1 - x2
    return truncate ? divint(diff, num) : diff
  }
}

function mapUnitToMilliseconds(unit: unknown): number {
  switch(unit) {
    case Unit.Millisecond: return 1
    case Unit.Second: return MILLISECONDS_OF_SECOND
    case Unit.Minute: return MINUTE_SECONDS
    case Unit.Hour: return HOUR_SECONDS
    case Unit.Day: return DAY_SECONDS
    case Unit.Week: return WEEK_SECONDS
    case Unit.Month: return DAY_SECONDS * 30
    case Unit.Year: return DAY_SECONDS * 30 * MONTHS_OF_YEAR
    default: throw makeUnknownUnitError(unit)
  }
}

/**
 * @export test
 */
export function makeUnknownUnitError(unit: unknown): Error {
  return new TypeError(`Unknown unit "${String(unit)}"`)
}

export default getDiff(Unit.Millisecond)
