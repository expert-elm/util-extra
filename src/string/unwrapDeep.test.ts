import unwrapDeep from './unwrapDeep'

test(`should unwrap until no change`, () => {
  expect(
    unwrapDeep(`'"([{foo}])"'`)
  ).toBe(
    `foo`
  )
})
