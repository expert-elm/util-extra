/**
 * convert date object to timestamp, if date was string or number, should parse at first
 * 
 * @param date date value
 */
export default function toTimestamp(date: Date | string | number): number {
  return date instanceof Date ? date.getTime() : +new Date(date)
}
