import { 
  ensure_array,
  is_array,
  is_empty_array,
  cut_at,
  cut,
  cut_all,
  select_array,
} from './array'

describe(ensure_array, () => {
  test('array', () => {
    expect(ensure_array([42])).toEqual([42])
  })
  test('non array', () => {
    expect(ensure_array(42)).toEqual([42])
  })
})

describe(is_array, () => {
  test('true', () => {
    expect(is_array([])).toBe(true)
    expect(is_array(Array())).toBe(true)
    expect(is_array(new Array())).toBe(true)
  })
  test('false', () => {
    expect(is_array(42)).toBe(false)
    expect(is_array({})).toBe(false)
  })
})

describe(is_empty_array, () => {
  test('empty array', () => {
    expect(is_empty_array([])).toBe(true)
    expect(is_empty_array(Array())).toBe(true)
    expect(is_empty_array(new Array())).toBe(true)
  })
  test('non empty array', () => {
    expect(is_empty_array([42])).toBe(false)
    expect(is_empty_array(Array(1))).toBe(false)
  })
})

describe(select_array, () => {
  test('include', () => {
    expect(select_array([1,2,3], { include: 4 })).toEqual([1,2,3,4])
    expect(select_array([1,2,3], { include: [4,5] })).toEqual([1,2,3,4,5])
  })
  test('exclude', () => {
    expect(select_array([1,2,3], { exclude: 1 })).toEqual([2,3])
    expect(select_array([1,2,3], { exclude: [1,2] })).toEqual([3])
  })
  test('test', () => {
    const test = jest.fn((a, b) => a.id === b.id)
    expect(select_array([{ id: 1 }], { exclude: [{ id: 1 }], test })).toEqual([])
    expect(test).toBeCalled()
  })
})

describe(cut_at, () => {
  test('split by index', () => {
    const arr = [1,2,3]
    expect(cut_at(arr, 1)).toEqual([[1,2], [3]])
  })
  test('index out of range', () => {
    const arr = [1,2,3]
    expect(cut_at(arr, arr.length)).toEqual([[1,2,3], []])
  })
  test('index = 0', () => {
    const arr = [1,2,3]
    expect(cut_at(arr, 0)).toEqual([[1], [2,3]])
  })
  test('index < 0', () => {
    const arr = [1,2,3]
    expect(cut_at(arr, -1)).toEqual([[1,2], [3]])
  })
  test('string', () => {
    expect(cut_at('foo', 0)).toEqual(['f', 'oo'])
  })
})

describe(cut, () => {
  test('split by size', () => {
    expect(cut([1,2,3], 1)).toEqual([[1], [2,3]])
  })
  test('out of range', () => {
    expect(cut([1,2,3], 4)).toEqual([[1,2,3], []])
  })
  test('throw', () => {
    expect(() => cut([1,2,3], -1)).toThrowError()
  })
  test('string', () => {
    expect(cut('foobar', 3)).toEqual(['foo', 'bar'])
  })
})

describe(cut_all, () => {
  test('no size', () => {
    expect(cut_all([])).toEqual([[]])
    expect(cut_all([1,2,3])).toEqual([[1,2,3]])
  })
  test('size = 1', () => {
    expect(cut_all([1,2,3], 1)).toEqual([[1],[2],[3]])
    expect(cut_all([1,2,3], 2)).toEqual([[1,2],[3]])
    expect(cut_all([1,2,3], 3)).toEqual([[1,2,3]])
  })
  test('size = 1, size > list.length', () => {
    expect(cut_all([1,2,3], 4)).toEqual([[1,2,3]])
  })
  test('size = 1, throw', () => {
    expect(() => cut_all([1,2,3], -1)).toThrowError()
  })
  test('size = n', () => {
    expect(cut_all([1,2,3,4,5,6], 3, 2)).toEqual([[1,2,3], [4,5], [6]])
  })
  test('size = n, throw', () => {
    expect(() => cut_all([1,2,3], 1, -2)).toThrowError()
  })
  test('string', () => {
    expect(cut_all('foobarbaz', 3)).toEqual(['foo', 'bar', 'baz'])
  })
})
