import ensureNode from './ensureNode'

beforeEach(() => {
  document.body.innerHTML = ``
})

test(`should get node`, () => {
  const node = document.createElement(`div`)
  node.id = `foo`
  document.body.appendChild(node)
  expect(ensureNode(`foo`)).toEqual(node)
})

test(`should create node when not found`, () => {  
  const node = ensureNode(`foo`)
  expect(node).toEqual(document.querySelector(`#foo`))
})

test(`should mount parent node`, () => {
  const container: HTMLElement = document.createElement(`div`)
  container.id = `foo`
  document.body.appendChild(container)  
  expect(
    ensureNode(`bar`, container)
  ).toEqual(document.querySelector(`#foo #bar`))
})

test(`should mount node with custom tag`, () => {
  expect(
    ensureNode(`foo`, undefined, `span`)
  ).toEqual(document.querySelector(`span#foo`))
})

test(`should mount node with custom node builder`, () => {
  expect(
    ensureNode(`foo`, undefined, _ => document.createElement(`div`))
  ).toEqual(document.querySelector(`#foo`))
})
