import { Some, None, isOptional, OPTIONAL_ERROR } from './optional'

describe(`create`, () => {
  test(`should be Optional instance`, () => {
    expect(
      isOptional(Some(42))
    ).toBe(true)
    expect(
      isOptional(None)
    ).toBe(true)
  })
})

describe(`binary`, () => {
  test(`should and other optional`, () => {
    expect(
      Some(42).and(Some(43))
    ).toEqual(Some(43))
    expect(
      Some(42).and(None)
    ).toEqual(None)
    expect(
      None.and(Some(42))
    ).toEqual(None)
    expect(
      None.and(None)
    ).toEqual(None)
  })

  test(`should and other optional, lazily`, () => {
    expect(
      Some(42).andThen(() => Some(43))
    ).toEqual(Some(43))
    expect(
      Some(42).andThen(() => None)
    ).toEqual(None)
    expect(
      None.andThen(() => Some(42))
    ).toEqual(None)
    expect(
      None.andThen(() => None)
    ).toEqual(None)
  })

  test(`should or other optional`, () => {
    expect(
      Some(42).or(Some(43))
    ).toEqual(Some(42))
    expect(
      Some(42).or(None)
    ).toEqual(Some(42))
    expect(
      None.or(Some(42))
    ).toEqual(Some(42))
    expect(
      None.or(None)
    ).toEqual(None)
  })

  test(`should or other optional, lazily`, () => {
    expect(
      Some(42).orElse(() => Some(43))
    ).toEqual(Some(42))
    expect(
      Some(42).orElse(() => None)
    ).toEqual(Some(42))
    expect(
      None.orElse(() => Some(42))
    ).toEqual(Some(42))
    expect(
      None.orElse(() => None)
    ).toEqual(None)
  })
})

describe(`map`, () => {
  test(`should map optional`, () => {
    expect(
      Some(42).map(a => a + 1)
    ).toEqual(Some(43))
    expect(
      None.map(_ => {})
    ).toEqual(None)
  })

  test(`should filter optional`, () => {
    expect(
      Some(42).filter(_ => true)
    ).toEqual(Some(42))
    expect(
      Some(42).filter(_ => false)
    ).toEqual(None)
    expect(
      None.filter(_ => true)
    ).toEqual(None)
    expect(
      None.filter(_ => false)
    ).toEqual(None)
  })
})

describe(`unwrap`, () => {
  test(`should unwrap optional`, () => {
    expect(
      Some(42).unwrap()
    ).toBe(42)
    expect(
      () => None.unwrap()
    ).toThrowError(OPTIONAL_ERROR)
  })
  
  test(`should unwrap optional with default value`, () => {
    expect(
      Some(42).unwrapOr(41)
    ).toBe(42)
    expect(
      None.unwrapOr(42)
    ).toBe(42)
  })
})
