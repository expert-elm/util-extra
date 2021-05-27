import { 
  to_boolean,
  is_boolean,
  is_true,
  is_false,
  is_falsy,
  is_truthy,
} from './boolean'

describe(to_boolean, () => {
  test('true', () => {
    expect(to_boolean(42)).toBe(true)
    expect(to_boolean({})).toBe(true)
  })
  test('false', () => {
    expect(to_boolean(0)).toBe(false)
    expect(to_boolean('')).toBe(false)
    expect(to_boolean(NaN)).toBe(false)
  })
})

describe(is_boolean, () => {
  test('boolean', () => {
    expect(is_boolean(false)).toBe(true)
    expect(is_boolean(Boolean())).toBe(true)
  })
  test('non boolean', () => {
    expect(is_boolean(null)).toBe(false)
  })
})

describe(is_true, () => {
  test('true', () => {
    expect(is_true(true)).toBe(true)
    expect(is_true(Boolean(Infinity))).toBe(true)
  })
  test('not true', () => {
    expect(is_true(false)).toBe(false)
    expect(is_true(Boolean(0))).toBe(false)
  })
})

describe(is_false, () => {
  test('false', () => {
    expect(is_false(false)).toBe(true)
    expect(is_false(Boolean(Number.NaN))).toBe(true)
  })
  test('not false', () => {
    expect(is_false(true)).toBe(false)
  })
})

describe(is_falsy, () => {
  test('falsy', () => {
    expect(is_falsy(null)).toBe(true)
    expect(is_falsy(NaN)).toBe(true)
    expect(is_falsy(-0)).toBe(true)
  })
  test('not falsy', () => {
    expect(is_falsy(42)).toBe(false)
    expect(is_falsy({})).toBe(false)
    expect(is_falsy([])).toBe(false)
  })
})

describe(is_truthy, () => {
  test('falsy', () => {
    expect(is_truthy(42)).toBe(true)
    expect(is_truthy({})).toBe(true)
  })
  test('not falsy', () => {
    expect(is_truthy(null)).toBe(false)
    expect(is_truthy(false)).toBe(false)
    expect(is_truthy(-0)).toBe(false)
  })
})
