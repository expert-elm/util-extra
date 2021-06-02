import {
  is_regexp
} from './regexp'

describe(is_regexp, () => {
  test('regexp', () => {
    expect(is_regexp(/./)).toBe(true)
    expect(is_regexp(new RegExp(''))).toBe(true)
  })
})
