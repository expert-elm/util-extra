/**
 * Get array element type
 * 
 * @typeParam T - Array type
 * @example ```ts
 * ElementType<number[]>      // number
 * ElementType<Array<string>> // string
 * ```
 */
export type ElementType<T extends Array<any>> = T extends Array<infer R> ? R : never


/**
 * Ensure value is a array
 * 
 * @param value - array or a element of array
 * @returns array
 * @example ```ts
 * ensure_array(42) // [42]
 * ensure_array([]) // []
 * ```
 */
export function ensure_array<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [ value ]
}

/**
 * Test value is array, just wrap `Array.isArray`
 * 
 * @param value - test value
 * @returns test result
 * @example ```ts
 * is_array([])        // true
 * is_array(Array())   // true
 * is_array({ 0: 42 }) // false
 * ```
 * @inline
 */
export function is_array(value: any): boolean {
  return Array.isArray(value)
}

/**
 * Test a array have empty element
 * 
 * @typeParam T - array type
 * @param array - array
 * @returns test result
 * @example ```ts
 * is_empty_array([])      // true
 * is_empty_array(Array()) // true
 * ```
 */
export function is_empty_array<T>(array: Array<T>): boolean {
  return 0 === array.length
}

/**
 * Select some elements from array
 * 
 * @param array - array
 * @param options - choose options
 * @returns choosed array
 */
export function select_array<T>(array: T[], options: SelectArrayOptions<T> = {}): T[] {
  const { 
    include = [], 
    exclude = [], 
    test = Object.is 
  } = options

  const inc = ensure_array(include)
  const exc = ensure_array(exclude)

  return array
    .concat(inc)
    .filter(item => !exc.some(e => test(e, item)))
}

/**
 * Options of choose_array
 * 
 * @typeParam T - array element type
 */
export interface SelectArrayOptions<T> {
  readonly include?: T | T[],
  readonly exclude?: T | T[],
  readonly test?: (a: T, b: T) => boolean
}

//#region split_array

/**
 * cut list by index
 * 
 * @param list - list
 * @param index - list index
 * @returns splited list
 * @example ```ts
 * cut_at([1,2,3], 1) // [[1,2], [3]]
 * ```
 */
export function cut_at(string: string, index: number): [ string, string ]
export function cut_at<T>(list: T[], index: number): [ T[], T[] ]
export function cut_at(list: any, index: number): any {
  if(index < 0) {
    return [ list.slice(0, index), list.slice(index) ]
  }
  else {
    const pos = index + 1
    return [ list.slice(0, pos), list.slice(pos) ]
  }
}

/**
 * cut list by size
 * 
 * @param list - list
 * @param size - size
 * @returns splited list
 * @throws size < 0
 * @example ```ts
 * split([])         // [[]]
 * split([1,2,3], 2) // [[1,2], [3]]
 * ```
 */
export function cut(string: string, size: number): [ string, string ]
export function cut<T>(list: T[], size: number): [ T[], T[] ]
export function cut(list: any, size: number): any {
  if(size < 0) throw new Error(`expected size >= 0, got "${size}"`)
  return [ list.slice(0, size), list.slice(size) ]
}

/**
 * cut list per size
 * 
 * @param list - list
 * @param size - size
 * @returns splited list
 * @example ```ts
 * cut_all([1,2,3,4,5,6], 2)    // [[1,2], [3,4], [5,6]]
 * cut_all([1,2,3,4,5,6], 1, 2) // [[1], [2,3], [4], [5,6]]
 * ```
 */
export function cut_all(string: string, ...size: number[]): string[] 
export function cut_all<T>(list: T[], ...size: number[]): T[][] 
export function cut_all(list: any, ...size: number[]): any {
  switch(size.length) {
    case 0: return [list]
    case 1: return cut_1(list, size[0])
    default: return cut_n(list, size)
  }

  function cut_1<T>(list: T[], size: number): T[][] {
    if(size < 0) throw new Error(`expected size >= 0, got "${size}"`)
    const arr: T[][] = []
    const len = list.length
    let i = 0
    while(i < len) {
      const beg = i, end = i + size
      arr.push(list.slice(beg, end))
      i = end
    }
    return arr
  }

  function cut_n<T>(list: T[], sizes: number[]): T[][] {
    const arr: T[][] = []
    const len = list.length
    let i = 0, j = 0
    while(i < len) {
      const size = sizes[j]
      if(size < 0) throw new Error(`expected size[${j}] >= 0, got "${size}"`)
      const beg = i, end = i + size
      arr.push(list.slice(beg, end))
      i = end
      j = next(j)
    }

    return arr

    function next(index: number) {
      switch(index) {
        case size.length - 1: return 0
        default: return index + 1
      }
    }
  }
}
//#endregion
