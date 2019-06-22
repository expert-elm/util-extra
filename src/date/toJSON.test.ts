import toJSON from './toJSON'

test.skip(`toJSON()`, () => {
  expect(
    toJSON(new Date(0))
  ).toEqual(
    {
      year: `1970`,
      month: `01`,
      day: `01`,
      hour: `08`,
      minute: `00`,
      second: `00`,
      millisecond: `000`
    }
  )
})
