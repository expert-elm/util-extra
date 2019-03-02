import { Ok, Err, isResult } from './result'
import { Some, None } from './optional'

const ERR: Error = new Error(`foo`)
const ERR2: Error = new Error(`bar`)

describe(`create and predicate test`, () => {
  test(`should be Result`, () => {
    expect(
      isResult(Ok(42))
    ).toBe(
      true
    )
    expect(
      isResult(Err(ERR))
    ).toBe(
      true
    )
  })
})

describe(`mapping`, () => {
  test(`should map Result value`, () => {
    expect(
      Ok(42).map(_ => 41)
    ).toEqual(
      Ok(41)
    )
    expect(
      Err(ERR).map(_ => 41)
    ).toEqual(
      Err(ERR)
    )
  })
  
  test(`should map Result error`, () => {
    expect(
      Ok(42).mapErr(_ => ERR)
    ).toEqual(
      Ok(42)
    )
    expect(
      Err(ERR).mapErr(_ => ERR2)
    ).toEqual(
      Err(ERR2)
    )
  })
  
  test(`should chain map`, () => {
    expect(
      Ok(42).map(_ => 41).map(_ => 40)
    ).toEqual(
      Ok(40)
    )
    expect(
      Ok(42).map(_ => 41).mapErr(_ => ERR)
    ).toEqual(
      Ok(41)
    )
  })
})

describe(`unwrap`, () => {
  test(`should unwrap and get value`, () => {
    expect(
      Ok(42).unwrap()
    ).toBe(
      42
    )
    expect(
      () => Err(ERR).unwrap()
    ).toThrowError(
      ERR
    )
  })
  
  test(`should unwrap with fallback value`, () => {
    expect(
      Ok(42).unwrapOr('foo')
    ).toBe(
      42
    )
    expect(
      Err(ERR).unwrapOr(42)
    ).toBe(
      42
    )
  })
  
  test(`should unwrap error with other value`, () => {
    expect(
      Ok(42).unwrapOrElse(_ => 'foo')
    ).toBe(
      42
    )
    expect(
      Err(ERR).unwrapOrElse(_ => 42)
    ).toBe(
      42
    )
  })

  test(`should unwrap and get error`, () => {
    expect(
      () => Ok(42).unwrapErr()
    ).toThrow(
      String(42)
    )
    expect(
      Err(ERR).unwrapErr()
    ).toEqual(
      ERR
    )
  })
})

describe(`transform to optional`, () => {
  test(`should transform to optional and discard error`, () => {
    expect(
      Ok(42).ok()
    ).toEqual(
      Some(42)
    )
    expect(
      Err(ERR).ok()
    ).toEqual(
      None
    )
  })

  test(`should transform to optional and discard successful value`, () => {
    expect(
      Ok(42).err()
    ).toEqual(
      None
    )
    expect(
      Err(ERR).err()
    ).toEqual(
      Some(ERR)
    )
  })

  test(`should transpose into opiotnal`, () => {
    expect(
      Ok(Some(42)).transpose()
    ).toEqual(
      Some(Ok(42))
    )
    expect(
      Err(ERR).transpose()
    ).toEqual(
      Some(Err(ERR))
    )
    expect(
      Ok(None).transpose()
    ).toEqual(
      None
    )
  })
})
