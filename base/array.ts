/**
 * convert T to T[]
 * @param array array or a element of array
 */
export function ensure_array<T>(array: T | T[]): T[] {
  return is_array(array) ? array : [ array ]
}

/**
 * test value is array
 * @param value value
 */
export function is_array<T = any>(value: any): value is Array<T> {
  return Array.isArray(value)
}

/**
 * test a array have empty element
 * @param array array
 */
export function is_empty_array<T>(array: Array<T>): boolean {
  return 0 === array.length
}

//#region choose
export function choose_array<T>(array: T[], { include = [], exclude = [], equals = Object.is }: ChooseArrayOptions<T> = {}): T[] {
  const inc: T[] = ensure_array(include)
  const exc: T[] = ensure_array(exclude)

  return array
    .concat(inc)
    .filter(item => !exc.some(e => equals(e, item)))
}

export interface ChooseArrayOptions<T> {
  // test: BaseTest<T> | U,
  readonly include?: T | T[],
  readonly exclude?: T | T[],
  readonly equals?: (a: T, b: T) => boolean
}
//#endregion

//#region slice_by
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
export function splitSlice(list: string, numbers: number[], strategy?: SplitStrategy): string[]
export function splitSlice<T>(list: T[], numbers: number[], strategy?: SplitStrategy): T[][]
export function splitSlice(list: any, numbers: number[], strategy: SplitStrategy = SplitStrategy.Length): any {
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
//#endregion
