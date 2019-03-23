/** string split strategy */
export const enum SplitStrategy { 
  /* split by offset length */
  Length, 
  /* split by index */
  Index 
}

/**
 * split list slices by length or index
 * 
 * @param list list
 * @param numbers split by numbers
 * @param strategy how to split string
 */
function splitSlice(list: string, numbers: number[], strategy?: SplitStrategy): string[]
function splitSlice<T>(list: T[], numbers: number[], strategy?: SplitStrategy): T[][]
function splitSlice(list: any, numbers: number[], strategy: SplitStrategy = SplitStrategy.Length): any {
  if('string' === typeof list) return splitString(list, numbers, strategy)
  return split(list, numbers, strategy)
}

function split<T>(list: T[], numbers: number[], strategy: SplitStrategy): T[][] {
  const func = makeSpliter(strategy)
  const [ ret, lst ] = numbers.reduce<[T[][], number]>(([ ret, prev ], curr) => {
    const [ slice, next ] = func(list, prev, curr)
    ret.push(slice)
    return [ret, next]
  }, [[], 0])

  ret.push(list.slice(lst))
  return ret
}

function splitString(list: string, numbers: number[], strategy: SplitStrategy): string[] {
  return split(list.split(``), numbers, strategy).map(s => s.join(``))
}

function makeSpliter(strategy: SplitStrategy) {
  return function sliceString<T>(list: T[], prev: number, curr: number): [T[], number] {
    switch(strategy) {
      case SplitStrategy.Length: {
        const next: number = curr + prev
        return [list.slice(prev, next), next]
      }
      case SplitStrategy.Index: {
        const next: number = curr + 1
        return [list.slice(prev, next), next]
      }
      default: throw new Error(`Unknown split strategy "${strategy}"`)
    }
  }
}

export default splitSlice
