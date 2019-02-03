export default function randomString(length: number = 6): string {
  if(length > 13 || length < 1) {
    throw new Error(`Argument length should less then 14 and greater then 0`)
  }
  return Math.random().toString(16).substr(2, length)
}
