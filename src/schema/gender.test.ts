import { Gender,
         INVALID_GENDER_ERROR,
         parse, 
         transform, 
         isGender, 
         isFemale, 
         isMale } from './gender'

describe(`predicate`, () => {
  test(`should be male`, () => {
    expect(
      isMale(Gender.Male)
    ).toBe(
      true
    )

    expect(
      isMale(42)
    ).toBe(
      false
    )
  })

  test(`should be female`, () => {
    expect(
      isFemale(Gender.Female)
    ).toBe(
      true
    )

    expect(
      isFemale(42)
    ).toBe(
      false
    )
  })

  test(`should be gender`, () => {
    expect(
      isGender(Gender.Male)
    ).toBe(
      true
    )
    
    expect(
      isGender(42)
    ).toBe(
      false
    )
  })
})

describe(`transform`, () => {
  test(`should convert to string`, () => {
    expect(
      transform(Gender.Male)
    ).toBe(
      'male'
    )

    expect(
      () => transform(42)
    ).toThrow(
      INVALID_GENDER_ERROR
    )
  })

  test(`should convert string to gender`, () => {
    expect(
      parse(`male`)
    ).toBe(
      Gender.Male
    )

    expect(
      () => parse(`foo`)
    ).toThrow(
      INVALID_GENDER_ERROR
    )
  })
})
