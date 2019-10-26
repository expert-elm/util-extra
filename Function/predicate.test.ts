import * as path from 'path'
import {
  isFunction
} from './predicate'

const ns = path.basename(__dirname)

describe(ns + ' predicate', () => {
  test('function ' + isFunction.name, () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(Function())).toBe(true)
    expect(isFunction(new Function)).toBe(true)
    expect(isFunction(42)).toBe(false)
  })
})
