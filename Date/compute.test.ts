import * as path from 'path'
import {
  getDateAgo, DateAgoText,
  getDateDiff, DateDiffType, 
  getDateOfYear
} from './compute'

const ns = path.basename(__dirname)

describe(ns + ' compute', () => {
  test('function ' + getDateAgo.name, () => {
    const base = new Date(0)
    expect(getDateAgo(base, { from: base })).toBe('just now')
    expect(getDateAgo(base, { from: new Date(1000) })).toBe('a sec ago')
    expect(getDateAgo(base, { from: new Date(2000) })).toBe('2 secs ago')
    expect(getDateAgo(base, { from: new Date(1000), text: { [DateAgoText.Ago]: 'foo' } })).toBe('a sec foo')
    expect(getDateAgo(base, { from: base, text: { [DateAgoText.JustNow]: 'foo' } })).toBe('foo')
    expect(getDateAgo(base, { from: new Date(1000), render: () => 'foo' })).toBe('foo')
    expect(getDateAgo(base, { from: new Date(1000), render: (num) => num.toString() })).toBe('1')
    expect(getDateAgo(base, { from: new Date(1000), render: (num, desc) => num.toString() + desc })).toBe('1sec')
  })

  test('function ' + getDateDiff.name, () => {
    const base = new Date(0)
    expect(getDateDiff(base, new Date(1000))).toBe(-1000)
    expect(getDateDiff(base, new Date(1000), { type: DateDiffType.Second })).toBe(-1)
  })
})

describe(ns + ' ofYear', () => {
  test('function ' + getDateOfYear.name, () => {
    const base = new Date(0)
    expect(getDateOfYear(base)).toBe(0)
  })
})
