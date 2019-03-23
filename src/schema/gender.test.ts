import { Gender, 
         fromString, 
         toString, 
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
      toString(Gender.Male)
    ).toBe(
      'male'
    )
  })

  test(`should convert string to gender`, () => {
    expect(
      fromString(`male`)
    ).toBe(
      Gender.Male
    )
  })
})
