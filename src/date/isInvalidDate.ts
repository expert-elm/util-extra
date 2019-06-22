export default function isInvalidaDate(date: Date): boolean {
  return isNaN(date.getTime())
}
