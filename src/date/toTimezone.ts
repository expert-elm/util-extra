import toPadZero from "../number/toPadZero"
import getHoursOfTimezone from './getHoursOfTimezone'
import assertInvalidDate from './assertInvalidDate'

export const enum Format {
  Hour,
  ISO8601,
  RFC2822
}

export default function toTimezone(date: Date, format: Format = Format.Hour): number | string {
  assertInvalidDate(date)
  const hour: number = getHoursOfTimezone(date)
  const sym: string = hour < 0 ? `-` : `+`
  const hourStr = toPadZero(Math.abs(hour), 2)
  switch(format) {
    case Format.Hour: return hour
    case Format.ISO8601: return sym + hourStr + `:00`
    case Format.RFC2822: return sym + hourStr + `00`
  }
}
