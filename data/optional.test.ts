import { Some, None, is_optional, OPTIONAL_ERROR, is_some, is_none } from './optional'
import { Ok, Err } from './result'

const ERR: Error = new Error()

describe(`predicate`, () => {
  test(`isOptional()`, () => {
    expect(
      is_optional(Some(42))
    ).toBe(
      true
    )

    expect(
      is_optional(None)
    ).toBe(
      true
    )
  })

  test(`isSome()`, () => {
    expect(
      is_some(Some(42))
    ).toBe(
      true
    )

    expect(
      is_some(None)
    ).toBe(
      false
    )
  })

  test(`isNone()`, () => {
    expect(
      is_none(Some(42))
    ).toBe(
      false
    )

    expect(
      is_none(None)
    ).toBe(
      true
    )
  })
})

describe(`binary`, () => {
  test(`Some.and()`, () => {
    expect(
      Some(42).and(Some(43))
    ).toEqual(
      Some(43)
    )
    
    expect(
      Some(42).and(None)
    ).toEqual(
      None
    )
  })

  test(`None.and()`, () => {
    expect(
      None.and(Some(42))
    ).toEqual(
      None
    )

    expect(
      None.and(None)
    ).toEqual(
      None
    )
  })

  test(`Some.andThen()`, () => {
    expect(
      Some(42).and_then(() => Some(43))
    ).toEqual(
      Some(43)
    )
    
    expect(
      Some(42).and_then(() => None)
    ).toEqual(
      None
    )
  })

  test(`None.andThen()`, () => {
    expect(
      None.and_then(() => Some(42))
    ).toEqual(
      None
    )

    expect(
      None.and_then(() => None)
    ).toEqual(
      None
    )
  })

  test(`Some.andThenAsync()`, async () => {
    expect(
      await Some(42).and_then_async(async () => Some(43))
    ).toEqual(
      Some(43)
    )
    
    expect(
      await Some(42).and_then_async(async () => None)
    ).toEqual(
      None
    )
  })

  test(`None.andThenAsync()`, async () => {
    expect(
      await None.and_then_async(async () => Some(42))
    ).toEqual(
      None
    )

    expect(
      await None.and_then_async(async () => None)
    ).toEqual(
      None
    )
  })

  test(`Some.or()`, () => {
    expect(
      Some(42).or(Some(43))
    ).toEqual(
      Some(42)
    )
    
    expect(
      Some(42).or(None)
    ).toEqual(
      Some(42)
    )
  })

  test(`None.or()`, () => {
    expect(
      None.or(Some(42))
    ).toEqual(
      Some(42)
    )
    
    expect(
      None.or(None)
    ).toEqual(
      None
    )
  })

  test(`Some.orElse()`, () => {
    expect(
      Some(42).or_else(() => Some(43))
    ).toEqual(
      Some(42)
    )
    
    expect(
      Some(42).or_else(() => None)
    ).toEqual(
      Some(42)
    )
  })

  test(`None.orElse()`, () => {
    expect(
      None.or_else(() => Some(42))
    ).toEqual(
      Some(42)
    )
    
    expect(
      None.or_else(() => None)
    ).toEqual(
      None
    )
  })

  test(`Some.orElseAsync()`, async () => {
    expect(
      await Some(42).or_else_async(async () => Some(43))
    ).toEqual(
      Some(42)
    )
    
    expect(
      await Some(42).or_else_async(async () => None)
    ).toEqual(
      Some(42)
    )
  })

  test(`None.orElseAsync()`, async () => {
    expect(
      await None.or_else_async(async () => Some(42))
    ).toEqual(
      Some(42)
    )
    
    expect(
      await None.or_else_async(async () => None)
    ).toEqual(
      None
    )
  })
})

describe(`mapping`, () => {
  test(`Some.map()`, () => {
    expect(
      Some(42).map(a => a + 1)
    ).toEqual(
      Some(43)
    )
  })

  test(`None.map()`, () => {
    expect(
      None.map(_ => {})
    ).toEqual(
      None
    )
  })

  test(`Some.mapAsync()`, async () => {
    expect(
      (await (await (await 
        Some(42)
          .map_async(async v => v + 1))
          .map_async(async v => v + 1))
          .map_async(async v => v + 1))
    ).toEqual(
      Some(45)
    )
  })

  test(`None.mapAsync()`, async () => {
    expect(
      await None.map_async(async _ => {})
    ).toEqual(None)
  })

  test(`Some.filter()`, () => {
    expect(
      Some(42).filter(_ => true)
    ).toEqual(Some(42))
    expect(
      Some(42).filter(_ => false)
    ).toEqual(
      None
    )
  })

  test(`None.filter()`, () => {
    expect(
      None.filter(_ => true)
    ).toEqual(
      None
    )

    expect(
      None.filter(_ => false)
    ).toEqual(
      None
    )
  })

  test(`Some.filterAsync()`, async () => {
    expect(
      await Some(42).filter_async(async _ => true)
    ).toEqual(
      Some(42)
    )

    expect(
      await Some(42).filter_async(async _ => false)
    ).toEqual(
      None
    )
  })

  test(`None.filterAsync()`, async () => {
    expect(
      await None.filter_async(async _ => true)
    ).toEqual(
      None
    )
    
    expect(
      await None.filter_async(async _ => false)
    ).toEqual(
      None
    )
  })
})

describe(`unwrap`, () => {
  test(`Some.unwrap()`, () => {
    expect(
      Some(42).unwrap()
    ).toBe(
      42
    )
  })
  
  test(`None.unwrap()`, () => {
    expect(
      () => None.unwrap()
    ).toThrowError(
      OPTIONAL_ERROR
    )
  })
  
  test(`Some.unwrapOr()`, () => {
    expect(
      Some(42).unwrap_or(41)
    ).toBe(
      42
    )
  })

  test(`None.unwrapOr()`, () => {
    expect(
      None.unwrap_or(42)
    ).toBe(
      42
    )
  })
})


describe(`to Result`, () => {
  test(`Some.okOr()`, () => {
    expect(
      Some(42).ok_or(ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOr()`, () => {
    expect(
      None.ok_or(ERR)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Some.okOrElse()`, () => {
    expect(
      Some(42).ok_or_else(() => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOrElse()`, () => {
    expect(
      None.ok_or_else(() => ERR)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Some.okOrElseAsync()`, async () => {
    expect(
      await Some(42).ok_or_else_async(async () => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOrElseAsync()`, async () => {
    expect(
      await None.ok_or_else_async(async () => ERR)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Some.transpose()`, () => {
    expect(
      Some(Ok(42)).transpose()
    ).toEqual(
      Ok(Some(42))
    )
    expect(
      Some(Err(ERR)).transpose()
    ).toEqual(
      Err(ERR)
    )
  })

  test(`None.transpose`, () => {
    expect(
      None.transpose()
    ).toEqual(
      Ok(None)
    )
  })
})
