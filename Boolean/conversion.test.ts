import * as path from 'path'
import {
  toBoolean
} from './conversion'

const ns = path.basename(__dirname)

describe(ns + ' conversion', () => {
  test('function ' + toBoolean.name, () => {
    expect(toBoolean(42)).toBe(true)
    expect(toBoolean(0)).toBe(false)
  })
})
