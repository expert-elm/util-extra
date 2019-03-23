import { AllDirection, 
         INVALID_DIRECTION_ERROR, 
         fromString, 
         toString,
         isDirection,
         isTop,
         isBottom,
         isRight,
         isLeft,
         isTopLeft,
         isTopRight,
         isBottomLeft,
         isBottomRight } from './allDirection'

describe(`predicate`, () => {
  test(`should be top`, () => {
    expect(
      isTop(AllDirection.Top)
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
      isRight(AllDirection.Right)
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
      isBottom(AllDirection.Bottom)
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
      isLeft(AllDirection.Left)
    ).toBe(
      true
    )
    expect(
      isLeft(43)
    ).toBe(
      false
    )
  })

  test(`should be top left`, () => {
    expect(
      isTopLeft(AllDirection.TopLeft)
    ).toBe(
      true
    )
    expect(
      isTopLeft(42)
    ).toBe(
      false
    )
  })

  test(`should be top right`, () => {
    expect(
      isTopRight(AllDirection.TopRight)
    ).toBe(
      true
    )
    expect(
      isTopRight(42)
    ).toBe(
      false
    )
  })

  test(`should be bottom left`, () => {
    expect(
      isBottomLeft(AllDirection.BottomLeft)
    ).toBe(
      true
    )
    expect(
      isBottomLeft(42)
    ).toBe(
      false
    )
  })

  test(`should be bottom right`, () => {
    expect(
      isBottomRight(AllDirection.BottomRight)
    ).toBe(
      true
    )
    expect(
      isBottomRight(42)
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
      fromString(`top-left`)
    ).toBe(
      AllDirection.TopLeft
    )
    expect(
      fromString(`bl`)
    ).toBe(
      AllDirection.BottomLeft
    )
    expect(
      () => fromString(`bb`, false)
    ).toThrowError(
      INVALID_DIRECTION_ERROR
    )
  })

  test(`should to string`, () => {
    expect(
      toString(AllDirection.TopLeft)
    ).toBe(
      `top-left`
    )
    expect(
      () => toString(42)
    ).toThrowError(
      INVALID_DIRECTION_ERROR
    )
  })
})
