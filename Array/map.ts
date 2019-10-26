import { ensureArray } from "./conversion"

export function chooseArray<T>(array: T[], { include = [], exclude = [], equals = Object.is }: ChooseArrayOptions<T> = {}): T[] {
  const inc: T[] = ensureArray(include)
  const exc: T[] = ensureArray(exclude)

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
