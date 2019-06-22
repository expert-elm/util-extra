import { makeInvaildHoursError } from "./makeError"
import assertInvalidDate from "./assertInvalidDate"

export const enum Midday {
  AM = 'AM',
  PM = 'PM'
}

export default function toMidday(date: Date, lowcase: boolean = false): string {
  assertInvalidDate(date)
  const hours: number = date.getHours()
  const midday: Midday = mapToMidday(hours)
  return lowcase ? midday.toLowerCase() : midday
}

function mapToMidday(hours: number): Midday {
  if(hours >= 0 && hours <= 12) return Midday.AM
  else if(hours > 12 && hours <= 23) return Midday.PM
  else throw makeInvaildHoursError(hours)
}
