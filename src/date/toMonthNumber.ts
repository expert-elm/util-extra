import toPadZero from "../number/toPadZero"
import { makeInvalidMonthError } from './makeError'
import assertInvalidDate from "./assertInvalidDate"

export default function toMonthNumber(date: Date, padZero: boolean = false): string {
  const month = date.getMonth()
  assertInvalidDate(date, makeInvalidMonthError(month))
  
  const ret: number = month + 1
  if(false === padZero) return ret.toString()
  return toPadZero(ret, 2)
}
