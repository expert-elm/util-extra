import divint from '../number/divint'

export interface Division {
  code: number,
  province: number,
  prefecture: number,
  county: number
}

/**
 * divison datas
 * 
 * @see [divison code](http://www.mca.gov.cn/article/sj/xzqh/)
 */
export interface DivisonData {
  [key: string]: string
}


/// PREDICATE ///

export function isDivisonExists(db: DivisonData, divison: string) {
  return undefined === db[divison]
}


/// TRANSFORM ///

export const INVALID_DIVISION: TypeError = new TypeError(`Invalid division code`)
const DIVISION_SPLITERS: number[] = [ 1e4, 1e2, 1e0 ]

export function parse(division: string): Division {
  if(6 !== division.length) throw INVALID_DIVISION
  const code: number = parseInt(division)
  if(code < 1e6) throw INVALID_DIVISION
  const [ province, prefecture, county ] = DIVISION_SPLITERS.map(div => divint(code, div) * div)
  return {
    code,
    province,
    prefecture,
    county
  }
}

export function transform(division: Division): string {
  return division.code.toString()
}
