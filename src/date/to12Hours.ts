import assertInvalidDate from "./assertInvalidDate"
import { Midday } from './toMidday'

export default function to12Hours(date: Date): [ number, Midday ] {
  assertInvalidDate(date)
  const hours = date.getHours()
  const midday = hours > 12 ? Midday.PM : Midday.AM
  return [ hours % 12, midday ]
}
