import assertInvalidDate from "./assertInvalidDate"
import { DAY_SECONDS } from "./constant"

export const enum Base {
  Day = 1,
  Week = 7
}

/**
 * @inline
 */
export default function ofYear(base: Base) {
  return (date: Date): number => {
    assertInvalidDate(date)
    const year: number = date.getFullYear()
    const timestamp: number = date.getTime()

    return Math.floor(
      (timestamp - Date.parse(year.toString())) / (DAY_SECONDS * base)
    ) + 1
  }
}
