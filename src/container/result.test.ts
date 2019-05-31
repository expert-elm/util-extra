import { Ok, Err, isResult, isOk, isErr } from './result'
import { Some, None } from './optional'

const ERR: Error = new Error(`foo`)
const ERR2: Error = new Error(`bar`)

describe(`predicate`, () => {
  test(`isResult()`, () => {
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

  test(`isOk()`, () => {
    expect(
      isOk(Ok(42))
    ).toBe(
      true
    )
    expect(
      isOk(Err(ERR))
    ).toBe(
      false
    )
  })

  test(`isErr()`, () => {
    expect(
      isErr(Ok(42))
    ).toBe(
      false
    )
    expect(
      isErr(Err(ERR))
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
      await Ok(42).mapAsync(async () => 41)
    ).toEqual(
      Ok(41)
    )
  })

  test(`Err.mapAsync()`, async () => {
    expect(
      await Err(ERR).mapAsync(async () => 41)
    ).toEqual(
      Err(ERR)
    )
  })
  
  test(`Ok.mapErr()`, () => {
    expect(
      Ok(42).mapErr(() => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`Err.mapErr()`, () => {
    expect(
      Err(ERR).mapErr(() => ERR2)
    ).toEqual(
      Err(ERR2)
    )
  })

  test(`Ok.mapErrAsync()`, async () => {
    expect(
      await Ok(42).mapErrAsync(async () => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`Err.mapErr()`, async () => {
    expect(
      await Err(ERR).mapErrAsync(async () => ERR2)
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
      Ok(42).map(() => 41).mapErr(() => ERR)
    ).toEqual(
      Ok(41)
    )
  })

  test(`async chain`, async () => {
    expect(
      (await (await 
          Ok(42)
            .mapAsync(async () => 41))
            .mapAsync(async () => 40))
    ).toEqual(
      Ok(40)
    )
    
    expect(
      (await (await 
        Ok(42)
          .mapAsync(async () => 41))
          .mapErrAsync(async () => ERR))
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
      Ok(42).unwrapOr('foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOr()`, () => {
    expect(
      Err(ERR).unwrapOr(42)
    ).toBe(
      42
    )
  })
  
  test(`Ok.unwrapOrElse()`, () => {
    expect(
      Ok(42).unwrapOrElse(() => 'foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOrElse()`, () => {
    expect(
      Err(ERR).unwrapOrElse(() => 42)
    ).toBe(
      42
    )
  })

  test(`Ok.unwrapOrElseAsync()`, async () => {
    expect(
      await Ok(42).unwrapOrElseAsync(async () => 'foo')
    ).toBe(
      42
    )
  })

  test(`Err.unwrapOrElseAsync()`, async () => {
    expect(
      await Err(ERR).unwrapOrElseAsync(async () => 42)
    ).toBe(
      42
    )
  })

  test(`Ok.unwrapErr()`, () => {
    expect(
      () => Ok(42).unwrapErr()
    ).toThrow(
      String(42)
    )
  })

  test(`Err.unwrapErr()`, () => {
    expect(
      Err(ERR).unwrapErr()
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
