import { 
  is_object,
  object_type,
  is_null_object,
  create_null_object,
  set_unenumerable,
  set_enumerable,
  is_enumerable,
} from './object'

describe(is_object, () => {
  test('object', () => {
    expect(is_object({})).toBe(true)
  })
  test('not object', () => {
    expect(is_object(null)).toBe(false)
  })
})

describe(object_type, () => {
  test('type', () => {
    expect(object_type({})).toBe('Object')
    expect(object_type(()=>{})).toBe('Function')
    expect(object_type(42)).toBe('Number')
    expect(object_type(42n)).toBe('BigInt')
    expect(object_type(undefined)).toBe('Undefined')
    expect(object_type(null)).toBe('Null')
    expect(object_type(function*(){})).toBe('GeneratorFunction')
  })
})

describe(create_null_object, () => {
  test('null', () => {
    expect(Object.getPrototypeOf(create_null_object())).toBe(null)
  })
  test('with object', () => {
    expect(Object.getPrototypeOf(create_null_object({ foo: 42 }))).toBe(null)
  })
})

describe(is_null_object, () => {
  test('null object', () => {
    expect(is_null_object(Object.create(null))).toBe(true)
  })
  test('normal object', () => {
    expect(is_null_object({})).toBe(false)
  })
})

describe(set_unenumerable, () => {
  test('unenumerable', () => {
    const obj = { foo: 42 }
    set_unenumerable(obj, 'foo')
    expect(obj.propertyIsEnumerable('foo')).toBe(false)
  })
})

describe(set_enumerable, () => {
  test('unenumerable', () => {
    const obj = { foo: 42 }
    set_enumerable(obj, 'foo')
    expect(obj.propertyIsEnumerable('foo')).toBe(true)
  })
})


describe(is_enumerable, () => {
  test('enumerable', () => {
    const obj = { foo: 42 }
    expect(is_enumerable(obj, 'foo')).toBe(true)
  })
  test('non enumerable', () => {
    const obj = { foo: 42 }
    expect(is_enumerable(obj, 'bar' as any)).toBe(false)
  })
})
