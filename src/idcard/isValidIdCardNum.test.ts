import isValidIdCardNum from "./isValidIdCardNum";

test(`should be true`, () => {
    expect(isValidIdCardNum("440982199510295379")).toBe(true)
})

test(`should be false`, () => {
    expect(isValidIdCardNum("1")).toBe(false)
})

test(`should be false`, () => {
    expect(isValidIdCardNum("440982199510295378")).toBe(false)
})
