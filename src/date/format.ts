import toYear from './toYear'
import toMonth from './toMonth'
import toMonthNumber from './toMonthNumber'
import toWeekDay, { WeekFormat } from './toWeekDay'
import toQuarter from  './toQuarter'
import toMidday from './toMidday'
import toPadZero from '../number/toPadZero'
import toNumeral from '../number/toNumeral'
import get12HoursOfDay from './get12HoursOfDay'
import { Formatter } from './formatDateNumber'
import getDaysOfYear from './getDaysOfYear'

export default function format(date: Date, format: string): string {
  return parse(format).map(([,trans]) => trans(date)).join('')
}

interface Transformer {
  (date: Date): string
}

const enum Token {
  YYYY,
  YY,
  MMMM,
  MMM,
  MM,
  Mo,
  M,
  QQ,
  Qo,
  Q,
  DDDD,
  DDDo,
  DDD,
  DD,
  Do,
  D,
  dddd,
  ddd,
  dd,
  do,
  d,
  ww,
  wo,
  w,
  A,
  a,
  HH,
  H,
  hh,
  h,
  mm,
  m,
  ss,
  s,
  SSS,
  SS,
  S,
  x,
  X,
  String
}

const transformer: { [K in Token]: Transformer } = {
  [Token.YYYY]: date => toYear(date),
  [Token.YY]: date => toYear(date, true),
  [Token.MMMM]: date => toMonth(date),
  [Token.MMM]: date => toMonth(date, true),
  [Token.MM]: date => toMonthNumber(date, Formatter.PadZero),
  [Token.Mo]: date => toMonthNumber(date, Formatter.Numeral),
  [Token.M]: date => toMonthNumber(date),
  [Token.QQ]: date => toQuarter(date, Formatter.PadZero),
  [Token.Qo]: date => toQuarter(date, Formatter.Numeral),
  [Token.Q]: date => toQuarter(date),
  [Token.DDDD]: date => toPadZero(getDaysOfYear(date), 3),
  [Token.DDDo]: date => toNumeral(getDaysOfYear(date)),
  [Token.DDD]: date => getDaysOfYear(date).toString(),
  [Token.DD]: date => toPadZero(date.getDate(), 2),
  [Token.Do]: date => toNumeral(date.getDate()),
  [Token.D]: date => date.getDate().toString(),
  [Token.dddd]: date => toWeekDay(date),
  [Token.ddd]: date => toWeekDay(date, WeekFormat.Short),
  [Token.dd]: date => toWeekDay(date, WeekFormat.Shorter),
  [Token.do]: date => toNumeral(date.getDay()),
  [Token.d]: date => date.getDay().toString(),
  [Token.ww]: date => toPadZero(getDaysOfYear(date), 2),
  [Token.wo]: date => toNumeral(getDaysOfYear(date)),
  [Token.w]: date => getDaysOfYear(date).toString(),
  [Token.A]: date => toMidday(date),
  [Token.a]: date => toMidday(date, true),
  [Token.HH]: date => toPadZero(date.getHours(), 2),
  [Token.H]: date => date.getHours().toString(),
  [Token.hh]: date => toPadZero(get12HoursOfDay(date)[0], 2),
  [Token.h]: date => get12HoursOfDay(date)[0].toString(),
  [Token.mm]: date => toPadZero(date.getMinutes(), 2),
  [Token.m]: date => date.getMinutes().toString(),
  [Token.ss]: date => toPadZero(date.getSeconds(), 2),
  [Token.s]: date => date.getSeconds().toString(),
  [Token.SSS]: date => toPadZero(date.getMilliseconds(), 3),
  [Token.SS]: date => toPadZero(date.getMilliseconds(), 3).substring(2),
  [Token.S]: date => toPadZero(date.getMilliseconds(), 3).substring(1),
  [Token.x]: date => date.getTime().toString(),
  [Token.X]: date => Math.floor(date.getTime() / 1000).toString(),
  [Token.String]: () => `STRING`
}

function parse(input: string): [Token, Transformer][] {
  const tokens: [Token, Transformer][] = []
  const curr = input.split('')

  let stack: string[] = []

  while(curr.length) {
    run()
  }

  return tokens

  function run() {
    switch (true) {
      case match('Y'):
        if(match('Y')) {
          if(match('Y')) {
            if(match('Y')) {
              make(Token.YYYY, 4)
              return
            }
            back()
          }
          make(Token.YY, 2)
          return
        }
        return
      case match('M'):
        if (match('M')) {
          if (match('M')) {
            if (match('M')) {
              make(Token.MMMM, 4)
              return
            }
            make(Token.MMM, 3)
            return
          }
          make(Token.MM, 2)
          return
        } else if (match('o')) {
          make(Token.Mo, 2)
          return
        }
        make(Token.M, 1)
        return
      case match('Q'):
        if(match('Q')) {
          make(Token.QQ, 2)
          return
        } else if(match('o')) {
          make(Token.Qo, 2)
          return
        }
        make(Token.Q, 1)
        return

      case match('D'):
        if(match('D')) {
          if(match('D')) {
            if(match('D')) {
              make(Token.DDDD, 4)
              return
            } else if(match('o')) {
              make(Token.DDDo, 4)
              return
            }
            make(Token.DDD, 3)
            return
          }
          make(Token.DD, 2)
          return
        } else if(match('o')) {
          make(Token.Do, 2)
          return
        }
        make(Token.D, 1)
        return
      case match('d'):
        if(match('d')) {
          if(match('d')) {
            if(match('d')) {
              make(Token.dddd, 4)
              return
            }
            make(Token.ddd, 3)
            return
          }
          make(Token.dd, 2)
          return
        } else if(match('o')) {
          make(Token.do, 2)
          return
        }
        make(Token.d, 1)
        return
      case match('w'):
        if(match('w')) {
          make(Token.ww, 2)
          return
        } else if(match('o')) {
          make(Token.wo, 2)
          return
        }
        make(Token.w, 1)
        return
      case match('A'):
        make(Token.A, 1)
        return
      case match('a'):
        make(Token.a, 1)
        return
      case match('H'):
        if(match('H')) {
          make(Token.HH, 2)
          return
        }
        make(Token.H, 1)
        return
      case match('h'):
        if(match('h')) {
          make(Token.hh, 2)
          return
        }
        make(Token.h, 1)
        return
      case match('m'):
        if(match('m')) {
          make(Token.mm, 2)
          return
        }
        make(Token.m, 1)
        return
      case match('s'):
        if(match('s')) {
          make(Token.ss, 2)
          return
        }
        make(Token.s, 1)
        return
      case match('S'):
        if(match('S')) {
          if(match('S')) {
            make(Token.SSS, 3)
            return
          }
          make(Token.SS, 2)
          return
        }
        make(Token.S, 1)
        return
      case match('X'):
        make(Token.X, 1)
        return
      case match('x'):
        make(Token.x, 1)
        return
      default:
        next()
        return
    }
  }

  function back(): void {
    curr.unshift(stack.pop() as string)
  }

  function next(): string | null {
    const fst = curr.shift()
    if(!fst) {
      return null
    }
    stack.push(fst)
    return fst
  }

  function match(char: string): boolean {
    const nn = next()
    if(nn) {
      if (char === nn) {
        return true
      } else {
        back()
        return false
      }
    } else {
      return false
    }
  }

  function make(token: Token, len: number): void {
    if(undefined !== token) {
      for(let i = 0; i < len; i++) {
        stack.pop()
      }
    }

    if(stack.length) {
      const str = stack.join('')
      tokens.push([Token.String, () => str])
    }

    if(undefined !== token) {
      tokens.push([token, transformer[token]])
    }

    stack = []
  }
}
