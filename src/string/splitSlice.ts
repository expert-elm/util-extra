/** string split strategy */
export enum SplitStrategy { 
  /* split by offset length */
  Length, 
  /* split by index */
  Index 
}

/**
 * split string to slices array
 * 
 * @param string target string
 * @param numbers split by numbers
 * @param strategy how to split string
 */
export default function splitSlice(string: string, 
                                   numbers: number[], 
                                   strategy: SplitStrategy = SplitStrategy.Length): string[] {
  const func = getStringSlice(strategy)
  const [ ret, last ] = numbers.reduce<[string[], number]>(([ ret, prev ], curr) => {
    const [ slice, next ] = func(string, prev, curr)
    return [ret.concat(slice), next]
  }, [[], 0])

  return ret.concat(string.slice(last))
}

function getStringSlice(strategy: SplitStrategy) {
  return function sliceString(string: string, prev: number, curr: number): [string, number] {
    switch(strategy) {
      case SplitStrategy.Length: {
        const next: number = curr + prev
        return [string.slice(prev, next), next]
      }
      case SplitStrategy.Index: {
        const next: number = curr + 1
        return [string.slice(prev, next), next]
      }
      default: throw new Error(`Unknown split strategy "${strategy}"`)
    }
  }
}
