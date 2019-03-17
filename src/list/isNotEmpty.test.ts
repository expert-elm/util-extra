import isNotEmpty from './isNotEmpty'

test(`should be false`, () => {
  expect(
    isNotEmpty([])
  ).toBe(
    false
  )
  expect(
    isNotEmpty('foo')
  ).toBe(
    false
  )
  expect(
    isNotEmpty({})
  ).toBe(
    false
  )
})

test(`should be true`, () => {
  expect(
    isNotEmpty([42])
  ).toBe(
    true
  )  
})
