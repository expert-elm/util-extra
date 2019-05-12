import data from './data'

test(`should create new item`, () => {
  const foo = { value: `foo` }
  const bar = { value: `bar` }
  expect(
    data([foo, bar]).create({ value: `baz` }).find()
  ).toEqual([
    { value: `foo` },
    { value: `bar` },
    { value: `baz` }
  ])
  expect(
    data([foo, bar]).createMany([
      { value: `baz` },
      { value: `qux` }
    ]).find()
  ).toEqual([
    { value: `foo` },
    { value: `bar` },
    { value: `baz` },
    { value: `qux` }
  ])
})

test(`should update item`, () => {
  const foo = { value: `foo` }
  const bar = { value: `bar` }
  const values = data([foo, bar])
  expect(
    values.update(foo, { value: `baz` }).find()
  ).toEqual([
    { value: `baz` },
    { value: `bar` }
  ])
})

test(`should drop item`, () => {
  const foo = { value: `foo` }
  const bar = { value: `bar` }
  expect(
    data([foo, bar]).drop(foo).find()
  ).toEqual([
    { value: `bar` }
  ])
  expect(
    data([foo, bar]).dropMany([foo, bar]).find()
  ).toEqual([])
})

test(`should drop item failed`, () => {
  const foo = { value: `foo` }
  const bar = { value: `bar` }
  const baz = { value: `baz` }
  const data1 = data([foo, bar])
  expect(
    data1.drop(baz)
  ).toBe(data1)
  const data2 = data([foo, bar])
  expect(
    data2.dropMany([baz])
  ).toBe(
    data2
  )

  data([new Date()])
})
