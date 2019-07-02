export default function sleep(millisecond: number): Promise<void> {
  return new Promise(res => setTimeout(res, millisecond))
}
