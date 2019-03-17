import unwrap from './unwrap'

/**
 * recur unwrap until no change
 * 
 * @param value string
 * @param includes pairs scope
 */
const unwrapDeep: typeof unwrap = function unwrapDeep(value, includes?) {
  let cache: string = value, curr: string
  while((curr = unwrap(cache, includes))) {
    if(curr === cache) return cache
    cache = curr
  }
  return curr
}

export default unwrapDeep
