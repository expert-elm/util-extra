/**
 * test date object was a invalid date value
 * 
 * @param date assert value
 */
export default function isInvalidaDate(date: Date): boolean {
  return isNaN(date.getTime())
}
