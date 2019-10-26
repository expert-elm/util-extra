import * as path from 'path'
import {
  toHashCode
} from './conversion'

const ns = path.basename(__dirname)

describe(ns + ' to number', () => {
  test('function ' + toHashCode.name, () => {
    expect(toHashCode('foo')).toBe(101574)
    expect(toHashCode('你好')).toBe(652829)
  })
})
