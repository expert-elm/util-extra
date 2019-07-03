import hash31 from './hash31'

test('should hash31 work', async () => {
  expect(hash31('123')).toBe(48690)
  expect(hash31('aaa')).toBe(96321)
})
