import { Ok, Err, is_result, is_ok, is_err } from './result'
import { Some, None } from './optional'

const ERR: Error = new Error(`foo`)
const ERR2: Error = new Error(`bar`)

describe(`predicate`, () => {
  test(`isResult()`, () => {
    expect(
      is_result(Ok(42))
    ).toBe(
      true
    )
    expect(
      is_result(Err(ERR))
    ).toBe(
      true
    )
  })

  test(`isOk()`, () => {
    expect(
      is_ok(Ok(42))
    ).toBe(
      true
    )
    expect(
      is_ok(Err(ERR))
    ).toBe(
      false
    )
  })

  test(`isErr()`, () => {
    expect(
      is_err(Ok(42))
    ).toBe(
      false
    )
    expect(
      is_err(Err(ERR))
    ).toBe(
      true
    )
  })
})

describe(`mapping`, () => {
  test(`Ok.map()`, () => {
    expect(
      Ok(42).map(() => 41)
    ).toEqual(
      Ok(41)
    )
  })

  test(`Err.map()`, () => {
    expect(
      Err(ERR).map(() => 41)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Ok.mapAsync()`, async () => {
    expect(
      await Ok(42).map_async(async () => 41)
    ).toEqual(
      Ok(41)
    )
  })

  test(`Err.mapAsync()`, async () => {
    expect(
      await Err(ERR).map_async(async () => 41)
    ).toEqual(
      Err(ERR)
    )
  })
  
  test(`Ok.mapErr()`, () => {
    expect(
      Ok(42).map_err(() => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`Err.mapErr()`, () => {
    expect(
      Err(ERR).map_err(() => ERR2)
    ).toEqual(
      Err(ERR2)
    )
  })

  test(`Ok.mapErrAsync()`, async () => {
    expect(
      await Ok(42).map_err_async(async () => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`Err.mapErr()`, async () => {
    expect(
      await Err(ERR).map_err_async(async () => ERR2)
    ).toEqual(
      Err(ERR2)
    )
  })
  
  test(`chain`, () => {
    expect(
      Ok(42).map(() => 41).map(() => 40)
    ).toEqual(
      Ok(40)
    )

    expect(
      Ok(42).map(() => 41).map_err(() => ERR)
    ).toEqual(
      Ok(41)
    )
  })

  test(`async chain`, async () => {
    expect(
      (await (await 
          Ok(42)
            .map_async(async () => 41))
            .map_async(async () => 40))
    ).toEqual(
      Ok(40)
    )
    
    expect(
      (await (await 
        Ok(42)
          .map_async(async () => 41))
          .map_err_async(async () => ERR))
    ).toEqual(
      Ok(41)
    )
  })
})

describe(`unwrap`, () => {
  test(`Ok.unwrap()`, () => {
    expect(
      Ok(42).unwrap()
    ).toBe(
      42
    )
  })

  test(`Err.unwrap()`, () => {
    expect(
      () => Err(ERR).unwrap()
    ).toThrowError(
      ERR
    )
  })
  
  test(`Ok.unwrapOr()`, () => {
    expect(
      Ok(42).unwrap_or('foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOr()`, () => {
    expect(
      Err(ERR).unwrap_or(42)
    ).toBe(
      42
    )
  })
  
  test(`Ok.unwrapOrElse()`, () => {
    expect(
      Ok(42).unwrap_or_else(() => 'foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOrElse()`, () => {
    expect(
      Err(ERR).unwrap_or_else(() => 42)
    ).toBe(
      42
    )
  })

  test(`Ok.unwrapOrElseAsync()`, async () => {
    expect(
      await Ok(42).unwrap_or_else_async(async () => 'foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOrElseAsync()`, async () => {
    expect(
      await Err(ERR).unwrap_or_else_async(async () => 42)
    ).toBe(
      42
    )
  })

  test(`Ok.unwrapErr()`, () => {
    expect(
      () => Ok(42).unwrap_err()
    ).toThrow(
      String(42)
    )
  })

  test(`Err.unwrapErr()`, () => {
    expect(
      Err(ERR).unwrap_err()
    ).toEqual(
      ERR
    )
  })
})

describe(`to Optional`, () => {
  test(`Ok.ok()`, () => {
    expect(
      Ok(42).ok()
    ).toEqual(
      Some(42)
    )
  })

  test(`Err.ok()`, () => {
    expect(
      Err(ERR).ok()
    ).toEqual(
      None
    )
  })

  test(`Ok.err()`, () => {
    expect(
      Ok(42).err()
    ).toEqual(
      None
    )
  })

  test(`Err.err()`, () => {
    expect(
      Err(ERR).err()
    ).toEqual(
      Some(ERR)
    )
  })

  test(`Ok.transpose()`, () => {
    expect(
      Ok(Some(42)).transpose()
    ).toEqual(
      Some(Ok(42))
    )

    expect(
      Ok(None).transpose()
    ).toEqual(
      None
    )
  })

  test(`Err.transpose()`, () => {
    expect(
      Err(ERR).transpose()
    ).toEqual(
      Some(Err(ERR))
    )
  })
})
