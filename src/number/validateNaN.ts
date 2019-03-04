export const NAN_ERROR: TypeError = new Error(`NaN was not allowd`)

export default function validateNaN(number: number): void {
  if(isNaN(number)) throw NAN_ERROR
}
