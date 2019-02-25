import { Ok, Err, Result } from './result'

const ERR: Error = new Error(`foo`)
const ERR2: Error = new Error(`bar`)

test(`should be Result`, () => {
  expect(Ok(42)).toBeInstanceOf(Result)
  expect(Err(ERR)).toBeInstanceOf(Result)
})

test(`should map Result value`, () => {
  expect(Ok(42).map(_ => 41)).toEqual(Ok(41))
  expect(Err(ERR).map(_ => 41)).toEqual(Err(ERR))
})

test(`should map Result error`, () => {
  expect(Ok(42).mapErr(_ => ERR)).toEqual(Ok(42))
  expect(Err(ERR).mapErr(_ => ERR2)).toEqual(Err(ERR2))
})

test(`should unwrap`, () => {
  expect(Ok(42).unwrap()).toBe(42)
  expect(() => Err(ERR).unwrap()).toThrowError(ERR)
})

test(`should unwrap with fallback value`, () => {
  expect(Ok(42).unwrapOr('foo')).toBe(42)
  expect(Err(ERR).unwrapOr(42)).toBe(42)
})

test(`should unwrap error with other value`, () => {
  expect(Ok(42).unwrapOrElse(_ => 'foo')).toBe(42)
  expect(Err(ERR).unwrapOrElse(_ => 42)).toBe(42)
})
