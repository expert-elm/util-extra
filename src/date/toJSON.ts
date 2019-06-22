import toYear from "./toYear"
import toMonthNumber from "./toMonthNumber"
import { Formatter } from "./formatDateNumber"
import toPadZero from "../number/toPadZero"

export type Data = {
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  second: string,
  millisecond: string
}

export default function toJson(date: Date): Data {
  return {
    year: toYear(date),
    month: toMonthNumber(date, Formatter.PadZero),
    day: toPadZero(date.getDate(), 2),
    hour: toPadZero(date.getHours(), 2),
    minute: toPadZero(date.getMinutes(), 2),
    second: toPadZero(date.getSeconds(), 2),
    millisecond: toPadZero(date.getMilliseconds(), 3)
  }
}
