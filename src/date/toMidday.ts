import { makeInvaildHoursError } from "./makeError"

export const enum Midday {
  AM,
  PM
}

type MiddayNames = { [K in Midday]: string }

export const MiddayName: MiddayNames = {
  [Midday.AM]: `AM`,
  [Midday.PM]: `PM`
}

export const MiddayShortName: MiddayNames = {
  [Midday.AM]: `am`,
  [Midday.PM]: `pm`
}

export default function toMidday(date: Date, short: boolean = false): string {
  const hours: number = date.getHours()
  const names = short ? MiddayShortName : MiddayName
  if(hours >= 0 && hours <= 12) return names[Midday.AM]
  else if(hours > 12 && hours <= 23) return names[Midday.PM]
  else throw makeInvaildHoursError(hours)
}
