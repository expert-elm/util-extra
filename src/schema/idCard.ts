import splitSlice from '../list/splitSlice'
import { toBoolean } from '../function/fromTryCatch'
import toLocalString, { Type } from '../date/toLocalString'

export interface IDCard {
  gender: string,
  areaCode: string,
  birthDate: Date,
  orderNumber: string,
  parityBit: string
}


/// PREDICATE ///

export function valideIDCard(numbers: number[]): void {
  if(numbers.length !== 18) throw INVALID_IDCARD
  const lst: number | undefined = numbers.pop()
  if(undefined === lst) throw INVALID_IDCARD
  const sum: number = numbers.reduce((acc, curr, index) => acc + ((1 << (17 - index)) % 11) * curr, 0)
  const checksum: number = (12 - (sum % 11)) % 11
  if(checksum !== lst) throw INVALID_IDCARD
}

export function isIDCard(idcard: string): boolean {
  return toBoolean(() => valideIDCard(idcard.split(``).map(parseIDCardNumber)))
}


/// TRANSFORM ///

export const INVALID_IDCARD: TypeError = new TypeError(`Invalid idcard`)

/**
 * idcard string parser, this function not valide code
 * 
 * @todo supports 15 length
 * @param idcard idcard string
 */
export function parse(idcard: string): IDCard {
  if (idcard.length !== 18) throw INVALID_IDCARD
  const [ areaCode, 
          year, 
          month, 
          date, 
          orderNumber, 
          gender, 
          parityBit ] = splitSlice(idcard, [6, 4, 2, 2, 2, 1])

  return { 
    areaCode, 
    birthDate: new Date(`${year}-${month}-${date}`), 
    gender,
    orderNumber,
    parityBit
  }
}

function parseIDCardNumber(value: string): number {
  if(/x/i.test(value)) return 10
  return parseInt(value)
}

export function transformParityBit(number: number, upperCase: boolean = true): string {
  if(number === 10) return upperCase ? 'X' : 'x'
  return number.toString()
}

export function transform(idcard: IDCard): string {
  const { areaCode: code, birthDate, orderNumber, gender, parityBit } = idcard
  return code 
  + toLocalString(birthDate, Type.Date).replace(/-/g, '')
  + orderNumber 
  + gender
  + parityBit
}

/// GENERATOR ///

