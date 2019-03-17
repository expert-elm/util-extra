import unwrap from './unwrap'

const unwrapDeep: typeof unwrap = function unwrapDeep(value, includes?) {
  let cache: string = value, curr: string
  while((curr = unwrap(cache, includes))) {
    if(curr === cache) return cache
    cache = curr
  }
  return curr
}

export default unwrapDeep
