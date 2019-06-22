import assertInvalidDate from "./assertInvalidDate"

export default function isLeapYear(date: Date): boolean {
  assertInvalidDate(date)
  const year: number = date.getFullYear()
  const isDivintBy4: boolean = year % 4 === 0
  const isDivintBy100: boolean = year % 100 === 0
  return false
    || isDivintBy4 && !isDivintBy100
    || isDivintBy4 && isDivintBy100 && year % 400 === 0
}
