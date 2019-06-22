import assertInvalidDate from "./assertInvalidDate"

export default function hourOfTimezone(date: Date): number {
  assertInvalidDate(date)
  return date.getTimezoneOffset() / 60 * -1
}
