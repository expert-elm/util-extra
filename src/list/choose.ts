import ensureList from './ensureList'

/** test predicate function  */
interface TestPredicateFunction<T> {
  (item: T): boolean
}

/** equals function */
interface EqualsFunction<T> {
  (expect: T, received: T): boolean
}

/** default equals */
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

type BaseTest<T> = T | TestPredicateFunction<T>

/** choose options */
export interface Options<T, U = never> {
  test: BaseTest<T> | U,
  include: T | T[],
  exclude: T | T[],
  equals: EqualsFunction<T>
}

/**
 * choose partial of list element by tester
 * 
 * @param list list
 * @param options options
 */
function choose(list: string[], options?: Partial<Options<string, RegExp>>): string[]
function choose<T, U>(list: T[], options?: Partial<Options<T, U>>): T[]
function choose(list: any, options?: any): any {
  if(0 === list.length) return []
  switch(typeof list[0]) {
    case 'string': return chooseString(list, options)
    default: return chooseAny(list, options)
  }
}

function chooseString(list: string[], options: Partial<Options<string>> = {}): string[] {
  const { test } = options
  if(!(test instanceof RegExp)) return chooseAny(list, options)
  return chooseAny(list, { ...options, test: (item: string) => test.test(item) })
}

function chooseAny<T>(list: T[], options: Partial<Options<T, never>> = {}): T[] {
  const { test = () => true, include = [], exclude = [], equals = defaultEquals } = options
  const match: TestPredicateFunction<T> = 'function' === typeof test
    ? test as TestPredicateFunction<T>
    : (item: T) => equals(item, test)
  const inc: T[] = ensureList(include)
  const exc: T[] = ensureList(exclude)

  return list
    .concat(inc)
    .filter(item => !exc.some(e => equals(e, item)))
    .filter(match)
}

export default choose
