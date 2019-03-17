import choose from './choose'

test(`should choose string list`, () => {
  expect(
    choose([`foo`, `bar`, `baz`], { test: `foo` })
  ).toEqual(
    [`foo`]
  )
  expect(
    choose([`foo`, `bar`, `baz`], { test: /ba/ })
  ).toEqual(
    [`bar`, `baz`]
  )
  expect(
    choose([`foo`, `bar`, `baz`], { test: a => a.endsWith(`o`) })
  ).toEqual(
    [`foo`]
  )
})

test(`should choose with includes and excludes`, () => {
  expect(
    choose([`foo`, `bar`, `baz`], { include: [`qux`, `quxx`] })
  ).toEqual(
    [`foo`, `bar`, `baz`, `qux`, `quxx`]
  )
  expect(
    choose([`foo`, `bar`, `baz`], { exclude: [`foo`] })
  ).toEqual(
    [`bar`, `baz`]
  )
})

test(`should choose with eq function`, () => {
  expect(
    choose([
      { value: `foo`},
      { value: `bar`},
      { value: `baz`}
    ], { 
      equals: (a, b) => a.value === b.value,
      test: { value: `foo` }
    })
  ).toEqual([{ value: `foo`}])
})
