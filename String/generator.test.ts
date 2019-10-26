import * as path from 'path'
import {
  generateRandomString
} from './generator'

const ns = path.basename(__dirname)

describe(ns + ' generate', () => {
  test('function ' + generateRandomString.name, () => {
    expect(generateRandomString().length).toBe(6)
    expect(() => generateRandomString(20)).toThrow()
    expect(() => generateRandomString(0)).toThrow()
  })
})
