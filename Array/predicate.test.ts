import * as path from 'path'
import {
  isArray, 
  isEmptyArray
} from './predicate'

const ns = path.basename(__dirname)

describe(ns + ' predicate', () => {
  test('function ' + isArray.name, () => {
    expect(isArray([])).toBe(true)
    expect(isArray(Array())).toBe(true)
    expect(isArray(new Array)).toBe(true)
    expect(isArray({})).toBe(false)
  })

  test('function ' + isEmptyArray.name, () => {
    expect(isEmptyArray([])).toBe(true)
    expect(isEmptyArray(Array())).toBe(true)
    expect(isEmptyArray(Array(1))).toBe(false)
  })
})
