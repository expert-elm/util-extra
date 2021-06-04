import { performance } from 'perf_hooks'
import {
  sleep,
  delay,
  timeout,
  retry,
  TimingFunctionType,
} from './timer'

beforeEach(() => {
  jest.useFakeTimers()
})

describe(sleep, () => {
  test('sleep', () => {
    sleep(1000)
    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})

describe(delay, () => {
  test('delay', () => {
    const fn = jest.fn()
    const delay_fn = delay(fn, 1000)
    delay_fn()
    expect(fn).not.toHaveBeenCalled()
    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
    expect(fn).toHaveBeenCalled()
  })
})

describe(timeout, () => {
  test('timeout', async () => {
    const fn = jest.fn(() => 42)
    const timeout_fn = timeout(fn, 1000)
    expect(fn).not.toHaveBeenCalled()
    const res = await timeout_fn()
    jest.runAllTimers()
    expect(res).toBe(42)
    expect(fn).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
  test('throw', async () => {
    const fn = jest.fn(() => sleep(1000))
    const timeout_fn = timeout(fn, 0)
    jest.runAllTimers()
    expect(timeout_fn()).rejects.toThrowError()
  })
})

describe.skip(retry, () => {
  test('retry', async () => {
    let i = 0
    const fn = jest.fn(() => {
      i += 1
      if(i !== 5) throw 42
      return 42
    })
    const retry_fn = retry(fn, 5, { base: 100, timing: TimingFunctionType.Linear })
    const res = await retry_fn()
    expect(res).toBe(42)
    expect(fn).toBeCalledTimes(5)
  }, 1e6)
  test('max times', async () => {
    let i = 0
    const fn = jest.fn(() => {
      i += 1
      if(i !== 5) throw 42
    })
    const retry_fn = retry(fn, 3, { base: 100 })
    expect(retry_fn()).rejects.toThrowError()
  })
  test('step', async () => {
    let i = 0
    const fn = jest.fn(() => {
      i += 1
      if(i !== 5) throw 42
      return 42
    })
    
    const retry_fn = retry(fn, 5, { base: 100, timing: TimingFunctionType.Step })
    const beg = performance.now()
    const res = await retry_fn()
    const end = performance.now()
    expect(res).toBe(42)
    expect(fn).toBeCalledTimes(5)
    expect((end - beg) > 5 * 100).toBe(true)
  })
  test('curve', async () => {
    let i = 0
    const fn = jest.fn(() => {
      i += 1
      if(i !== 5) throw 42
      return 42
    })
    const retry_fn = retry(fn, 5, { base: 100, timing: TimingFunctionType.Curve })
    const beg = performance.now()
    const res = await retry_fn()
    const end = performance.now()
    expect(res).toBe(42)
    expect(fn).toBeCalledTimes(5)
    expect((end - beg) > 5 * 100).toBe(true)
  })
})
