export default function randomString(length: number = 6) {
  if(length > 13) throw new Error(`the length should less then 13`)
  return Math.random().toString(16).substr(2, length)
}
