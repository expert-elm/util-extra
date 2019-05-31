import { Some, None, isOptional, OPTIONAL_ERROR, isSome, isNone } from './optional'
import { Ok, Err } from './result'

const ERR: Error = new Error()

describe(`predicate`, () => {
  test(`isOptional()`, () => {
    expect(
      isOptional(Some(42))
    ).toBe(
      true
    )

    expect(
      isOptional(None)
    ).toBe(
      true
    )
  })

  test(`isSome()`, () => {
    expect(
      isSome(Some(42))
    ).toBe(
      true
    )

    expect(
      isSome(None)
    ).toBe(
      false
    )
  })

  test(`isNone()`, () => {
    expect(
      isNone(Some(42))
    ).toBe(
      false
    )

    expect(
      isNone(None)
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
      Some(42).andThen(() => Some(43))
    ).toEqual(
      Some(43)
    )
    
    expect(
      Some(42).andThen(() => None)
    ).toEqual(
      None
    )
  })

  test(`None.andThen()`, () => {
    expect(
      None.andThen(() => Some(42))
    ).toEqual(
      None
    )

    expect(
      None.andThen(() => None)
    ).toEqual(
      None
    )
  })

  test(`Some.andThenAsync()`, async () => {
    expect(
      await Some(42).andThenAsync(async () => Some(43))
    ).toEqual(
      Some(43)
    )
    
    expect(
      await Some(42).andThenAsync(async () => None)
    ).toEqual(
      None
    )
  })

  test(`None.andThenAsync()`, async () => {
    expect(
      await None.andThenAsync(async () => Some(42))
    ).toEqual(
      None
    )

    expect(
      await None.andThenAsync(async () => None)
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
      Some(42).orElse(() => Some(43))
    ).toEqual(
      Some(42)
    )
    
    expect(
      Some(42).orElse(() => None)
    ).toEqual(
      Some(42)
    )
  })

  test(`None.orElse()`, () => {
    expect(
      None.orElse(() => Some(42))
    ).toEqual(
      Some(42)
    )
    
    expect(
      None.orElse(() => None)
    ).toEqual(
      None
    )
  })

  test(`Some.orElseAsync()`, async () => {
    expect(
      await Some(42).orElseAsync(async () => Some(43))
    ).toEqual(
      Some(42)
    )
    
    expect(
      await Some(42).orElseAsync(async () => None)
    ).toEqual(
      Some(42)
    )
  })

  test(`None.orElseAsync()`, async () => {
    expect(
      await None.orElseAsync(async () => Some(42))
    ).toEqual(
      Some(42)
    )
    
    expect(
      await None.orElseAsync(async () => None)
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
          .mapAsync(async v => v + 1))
          .mapAsync(async v => v + 1))
          .mapAsync(async v => v + 1))
    ).toEqual(
      Some(45)
    )
  })

  test(`None.mapAsync()`, async () => {
    expect(
      await None.mapAsync(async _ => {})
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
      await Some(42).filterAsync(async _ => true)
    ).toEqual(
      Some(42)
    )

    expect(
      await Some(42).filterAsync(async _ => false)
    ).toEqual(
      None
    )
  })

  test(`None.filterAsync()`, async () => {
    expect(
      await None.filterAsync(async _ => true)
    ).toEqual(
      None
    )
    
    expect(
      await None.filterAsync(async _ => false)
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
      Some(42).unwrapOr(41)
    ).toBe(
      42
    )
  })

  test(`None.unwrapOr()`, () => {
    expect(
      None.unwrapOr(42)
    ).toBe(
      42
    )
  })
})


describe(`to Result`, () => {
  test(`Some.okOr()`, () => {
    expect(
      Some(42).okOr(ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOr()`, () => {
    expect(
      None.okOr(ERR)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Some.okOrElse()`, () => {
    expect(
      Some(42).okOrElse(() => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOrElse()`, () => {
    expect(
      None.okOrElse(() => ERR)
    ).toEqual(
      Err(ERR)
    )
  })

  test(`Some.okOrElseAsync()`, async () => {
    expect(
      await Some(42).okOrElseAsync(async () => ERR)
    ).toEqual(
      Ok(42)
    )
  })

  test(`None.okOrElseAsync()`, async () => {
    expect(
      await None.okOrElseAsync(async () => ERR)
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
