import { IDCard } from "./IDCardType"
import ParameterType from "../type/ParameterType"
import splitSlice from "../list/splitSlice"

const IDCARDLENGTHERROR: Error = new Error(`IDCard length should be 18`)

export default function parseIDCard(string: string): IDCard {
  validate(string)
  const [ code, date, gender, key ] = splitSlice(string, [6, 8, 3])
  
  return { 
    code: parseInt(code), 
    date: new Date(date), 
    gender: parseInt(gender),
    key 
  }
}

export function validate(string: ParameterType<typeof parseIDCard>): void {
  if(18 !== string.length) throw IDCARDLENGTHERROR
}
