import getImageDataUrl from './getImageDataUrl'

test(`default`, async () => {
  HTMLImageElement.prototype.decode = jest.fn()
  const res = await getImageDataUrl('')
  return expect(res).toBe('data:image/png;base64,00')
})
