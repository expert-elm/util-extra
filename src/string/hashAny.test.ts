import hashAny, { hashObjByJson } from './hashAny'

test('should hashAny(primary) work', async () => {
  expect(hashAny(123)).toBe('123')
  expect(hashAny('aaa')).toBe('📝aaa')
  expect(hashAny(new Date(2000, 0, 1))).toBe('📅946656000000')
  expect(hashAny([1, 'aa', new Date(2000, 0, 1)])).toBe(
    '🔗1⁞📝aa⁞📅946656000000',
  )
})

test('show hashAny(objRef)', async () => {
  expect(hashAny({ aa: 1 })).toBe('⭕️1')
  expect(hashAny({ aa: 2 })).toBe('⭕️2')
  expect(hashAny(() => {})).toBe('⭕️3')
})

test('should hashAny(json) work', async () => {
  expect(
    hashAny(
      { aa: 1, bb: 'aaa', cc: new Date(2000, 0, 1), dd: { ff: 1 } },
      hashObjByJson,
    ),
  ).toBe(
    'Object{"aa":"1","bb":"📝aaa","cc":"📝1999-12-31T16:00:00.000Z","dd":"Object{\\"ff\\":\\"1\\"}"}',
  )
  class B {
    dd = 123
  }
  class A {
    aa = 1
    bb = 'aa'
    cc = new B()
  }
  expect(hashAny(new A(), hashObjByJson)).toBe(
    'A{"aa":"1","bb":"📝aa","cc":"B{\\"dd\\":\\"123\\"}"}',
  )
})
