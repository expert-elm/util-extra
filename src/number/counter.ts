export default function* generateCounter(init: number = 0): IterableIterator<number> {
  let i: number = init
  while(true) {
    yield i
    i++
  }
}

export const DEFAULT_COUNTER: IterableIterator<number> = generateCounter()
