/**
 * sleep millisecond
 * @param ms sleep for ms
 */
export default function sleep(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms))
}
