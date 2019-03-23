import { toBoolean, toNullable, toOptional, toResult } from './fromTryCatch'
import { Some, None } from '../container/optional'
import { Ok, Err } from '../container/result'

test(`should convert to boolean`, () => {
  expect(
    toBoolean(() => 42)
  ).toBe(
    true
  )

  expect(
    toBoolean(() => { throw 42 })
  ).toBe(
    false
  )
})

test(`should convert to null or value`, () => {
  expect(
    toNullable(() => 42)
  ).toBe(
    42
  )

  expect(
    toNullable(() => { throw 42 })
  ).toBe(
    null
  )
})

test(`should convert to Optional`, () => {
  expect(
    toOptional(() => 42)
  ).toEqual(
    Some(42)
  )

  expect(
    toOptional(() => { throw 42 })
  ).toEqual(
    None
  )
})

test(`should convert to Result`, () => {
  expect(
    toResult(() => 42)
  ).toEqual(
    Ok(42)
  )

  expect(
    toResult(() => { throw 42 })
  ).toEqual(
    Err(42)
  )
})
