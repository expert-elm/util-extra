import setIconLinkElement from './setIconLinkElement'
import getNodes from './getNodes'

afterEach(() => {
  getNodes('link', document.head).forEach(link => link.remove())
})

test(`default`, () => {
  const link = setIconLinkElement('./foo')
  expect(link).toBeInstanceOf(HTMLLinkElement)
  expect(link.getAttribute('href')).toBe('./foo')
})

test(`append`, () => {
  setIconLinkElement('./foo')
  expect(getNodes('link').length).toBe(1)
})

test(`replace`, () => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'icon')
  document.head.appendChild(link)
  setIconLinkElement('./foo')
  expect(getNodes('link').length).toBe(1)
})
