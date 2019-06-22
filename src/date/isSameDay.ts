import getDaysDiff from "./getDaysDiff"

export default function isSameDay(date1: Date, date2:Date): boolean {
  return 0 === getDaysDiff(date1, date2)
}
