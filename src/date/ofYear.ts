import assertInvalidDate from "./assertInvalidDate"

/**
 * @inline
 */
export default function ofYear(base: 1 | 7) {
  return (date: Date): number => {
    assertInvalidDate(date)
    const year: number = date.getFullYear()
    const timestamp: number = date.getTime()

    return Math.floor(
      (timestamp - Date.parse(year.toString())) / (1000 * 60 * 60 * 24 * base)
    ) + 1
  }
}
