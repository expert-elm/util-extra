import { makeInvalidMonthError } from './makeError'

export const enum Quarter {
  First,
  Secondary,
  Third,
  Fourth
}

type QuarterNames = { [K in Quarter]: string }

export const QuarterName: QuarterNames = {
  [Quarter.First]: `First`,
  [Quarter.Secondary]: `Secondary`,
  [Quarter.Third]: `Third`,
  [Quarter.Fourth]: `Fourth`
}

export const QuarterShortName: QuarterNames = {
  [Quarter.First]: `1st`,
  [Quarter.Secondary]: `2nd`,
  [Quarter.Third]: `3rd`,
  [Quarter.Fourth]: `4th`
}

export default function toQuarter(date: Date, short: boolean = false): string {
  const month: number = date.getMonth()
  const names = short ? QuarterShortName : QuarterName
  switch(month) {
    case 0:
    case 1:
    case 2: return names[Quarter.First]
    case 3:
    case 4:
    case 5: return names[Quarter.Secondary]
    case 6:
    case 7: 
    case 8: return names[Quarter.Third]
    case 9:
    case 10:
    case 11: return names[Quarter.Fourth]
    default: throw makeInvalidMonthError(month)
  }
}
