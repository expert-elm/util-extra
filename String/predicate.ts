import { isTrue } from '../Boolean/predicate'

/**
 * test value is string type
 * @param value value
 */
export function isString(value: any): value is string {
  return 'string' === typeof value || '[object String]' === toString.call(value)
}

/**
 * test a string is blank string
 * @param str string
 * @param options isBlankStringOptions
 */
export function isBlankString(str: string, { trim = false }: isBlankStringOptions = {}): str is '' {
  if(isTrue(trim)) return '' === str.trim()
  return '' === str
}

/**
 * isBlankString options
 */
export interface isBlankStringOptions {
  /**
   * compare with trimed string
   */
  readonly trim?: boolean
}

/**
 * assert string is blank string
 * @param str string
 * @param options isBlankStringOptions
 * @throws
 */
export function assertNonBlankString(str: string, options: isBlankStringOptions = {}): void {
  if(isBlankString(str, options)) throw new Error('string is blank string')
}
