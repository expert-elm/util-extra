import to12Hours from './to12Hours'
import { Midday } from './toMidday'

test(`to12Hours()`, () => {
  expect(
    to12Hours(new Date(`1970-01-01T23:59`))
  ).toEqual(
    [11, Midday.PM]
  )
  expect(
    to12Hours(new Date(`1970-01-01T00:00`))
  ).toEqual(
    [0, Midday.AM]
  )
})

test(`to12Hours() throw`, () => {
  expect(
    () => to12Hours(new Date(`foo`))
  ).toThrow()
})
