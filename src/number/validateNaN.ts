export const NAN_ERROR: TypeError = new Error(`NaN was not allowd`)

/**
 * throw when number is `NaN`
 * 
 * @param number number
 */
export default function validateNaN(number: number): void {
  if(isNaN(number)) throw NAN_ERROR
}
