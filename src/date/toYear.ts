import assertInvalidDate from "./assertInvalidDate"

export default function toYear(date: Date, short: boolean = false): string {
  assertInvalidDate(date)
  const year: string = date.getFullYear().toString()
  if(false === short) return year
  return year.substring(2)
}
