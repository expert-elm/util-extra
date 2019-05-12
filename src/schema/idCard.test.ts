import { parse, transform } from './idCard'

describe(`transform`, () => {
  test(`should parse string to idcard`, () => {
    expect(
      parse(`140000190001010000`)
    ).toEqual(
      {
        code: `140000`,
        birthDate: new Date(`1900-01-01`),
        gender: `0`,
        orderNumber: `00`,
        parityBit: `0`
      }
    )    
  })

  test(`should transform to idcard string`, () => {
    expect(
      transform({
        areaCode: `140000`,
        birthDate: new Date(`1900-01-01`),
        gender: `0`,
        orderNumber: `00`,
        parityBit: `0`
      })
    ).toBe(
      `140000190001010000`
    )
  })
})
