import assertNaN from "./assertNaN"

export default function toNumeral(number: number): string {
  assertNaN(number)
  const str: string = number.toString()
  switch(number.toString().slice(-1)) {
    case '1': return str + 'st'
    case '2': return str + 'nd'
    case '3': return str + 'rd'
    default: return str + 'th'
  }
}
