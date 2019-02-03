export default function randomString(length: number = 6): string {
  if(length > 13) throw new Error(`Argument length should less then 13`)
  return Math.random().toString(16).substr(2, length)
}
