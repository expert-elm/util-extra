import { object_type } from './object'

/**
 * Test value is regexp
 * 
 * @param value - value
 * @returns test result
 * @example ```ts
 * is_regexp(/./)          // true
 * is_regexp(new RegExp()) // true
 * ```
 */
export function is_regexp(value: unknown): value is RegExp {
  return 'RegExp' === object_type(value)
}
