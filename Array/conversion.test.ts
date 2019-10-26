import * as path from 'path'
import {
  ensureArray
} from './conversion'

const ns = path.basename(__dirname)

describe(ns + ' ensureArray', () => {
  test('function ' + ensureArray.name, () => {
    expect(ensureArray([])).toStrictEqual([])
    expect(ensureArray(42)).toStrictEqual([42])
  })
})
