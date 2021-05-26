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
