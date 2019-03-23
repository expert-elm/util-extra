import { Direction, 
         INVALID_DIRECTION_ERROR, 
         parse, 
         transform,
         isDirection,
         isTop,
         isBottom,
         isRight,
         isLeft } from './direction'

describe(`predicate`, () => {
  test(`should be top`, () => {
    expect(
      isTop(0)
    ).toBe(
      true
    )
    expect(
      isTop(42)
    ).toBe(
      false
    )
  })

  test(`should be right`, () => {
    expect(
      isRight(1)
    ).toBe(
      true
    )
    expect(
      isRight(42)
    ).toBe(
      false
    )
  })
  
  test(`should be bottom`, () => {
    expect(
      isBottom(2)
    ).toBe(
      true
    )
    expect(
      isBottom(42)
    ).toBe(
      false
    )
  })

  test(`should be left`, () => {
    expect(
      isLeft(3)
    ).toBe(
      true
    )
    expect(
      isLeft(43)
    ).toBe(
      false
    )
  })

  test(`should test is not a direction`, () => {
    expect(
      isDirection(0)
    ).toBe(
      true
    )
    expect(
      isDirection(42)
    ).toBe(
      false
    )
  })
})

describe(`transforms`, () => {
  test(`should convert alias to direction`, () => {
    expect(
      parse(`top`)
    ).toBe(
      Direction.Top
    )
    expect(
      parse(`bb`)
    ).toBe(
      Direction.Bottom
    )
    expect(
      () => parse(`bb`, false)
    ).toThrowError(
      INVALID_DIRECTION_ERROR
    )
  })

  test(`should to string`, () => {
    expect(
      transform(Direction.Top)
    ).toBe(
      `top`
    )
    expect(
      () => transform(42)
    ).toThrowError(
      INVALID_DIRECTION_ERROR
    )
  })
})
