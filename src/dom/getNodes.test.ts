import $$ from './getNodes'

beforeEach(() => {
  document.body.innerHTML = ``
})

test(`should get nodes as array type`, () => {
  for(let i = 0; i < 1e2; i++) {
    const node: Element = document.createElement(`div`)
    document.body.append(node)
  }

  expect(Array.isArray($$(`div`))).toBe(true)
  expect($$(`div`).length).toBe(1e2)
})

test(`should get empty array`, () => {
  expect($$('foo')).toEqual([])
})
