/**
 * String.hashCode from Java
 * @see [stackoverflow:generate-a-hash-from-string-in-javascript](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
 * @param str string
 */
export function toHashCode(str: string): number {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash
}

