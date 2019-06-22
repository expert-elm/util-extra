export const NAN_ERROR: Error = new Error(`NaN was not allow`)

export default function assertNaN(number: number, error: Error = NAN_ERROR): void {
  if(isNaN(number)) throw error
}
