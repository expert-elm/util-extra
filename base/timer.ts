import { AnyFunction } from './function'
import { Thunk } from './thunk'

export function sleep(timeout: number): Promise<void> {
  return new Promise(res => setTimeout(res, timeout))
}

export function timeout<F extends AnyFunction>(timeout: number, fn: F): Promise<ReturnType<F>> {
  return new Promise(async (res, rej) => {
    const timer = setTimeout(cleanup, timeout)
    res(await fn())

    function cleanup(): void {
      clearTimeout(timer)
      rej(new Error(`Timeout`))
    }
  })
}

export async function delay<F extends AnyFunction>(timeout: number, fn: F): Promise<ReturnType<F>> {
  await sleep(timeout)
  return fn()
}


export function call_to_boolean<T = any>(fn: Thunk<T>): boolean {
  try { 
    fn() 
    return true 
  } catch(_) { 
    return false
  }
}

export function call_to_factory<T = any, V = null | undefined>(fn: Thunk<T>, nullOrUndefined?: V): T | V {
  try { 
    return fn()
  } catch(_) { 
    return nullOrUndefined as V
  }
}

export function call_to_null<T = any>(fn: Thunk<T>): T | null {
  return call_to_factory(fn, null)
}

export function call_to_undefined<T = any>(fn: Thunk<T>): T | undefined {
  return call_to_factory(fn, undefined)
}


/** build-in timing function */
export const enum TimingFunctionType {
  /* change by steps */
  Step,
  /* linear, interval no changed */
  Linear,
  /* curve, fast forward then slow out */
  Curve
}

type TimingFunctions = {
  [K in TimingFunctionType]: TimingFunction
}

/** build-in timing function implements  */
export const TIMING_FUNCTION: TimingFunctions = {
  [TimingFunctionType.Step]: a => {
    if(a <= 3) return 0
    else if(a <= 6) return 1
    else return 2
  },
  [TimingFunctionType.Linear]: a => a,
  [TimingFunctionType.Curve]: a => Math.log1p(a)
}

/** 
 * timing function type 
 * 
 * @param times current run times
 * @param options retry options
 */
export interface TimingFunction {
  (times: number, options: Options): number
}

/** retry options type */
export interface Options {
  /** basic interval, default to 1s */
  base?: number,
  /** max retry times, default to 10 times */
  max?: number
  /** timing function, use build-in or custom equation, default to linear */
  func?: TimingFunctionType | TimingFunction
}

/** default retry options */
export const DEFAULT_OPTIONS: Options = {
  base: 1000,
  max: 10,
  func: TimingFunctionType.Linear
}

/** max retry times errors  */
const MAX_RETRY_TIMES_ERROR: Error = new Error(`Maximum retry times`)

/**
 * retry function that not throw
 *  
 * @param fn caller
 * @param options retry options
 */
export async function retry<F extends AnyFunction<R>, R>(fn: F, options: Options = {}): Promise<ReturnType<F>> {
  const { base = 1000, max = 10, func = TimingFunctionType.Linear } = options

  let times: number = 0
  const equ: TimingFunction = 'function' === typeof func ? func : TIMING_FUNCTION[func]
  
  while(times < max) {    
    try {
      const dt = equ(times, { base, max, func })
      const ms: number = (dt + 1) * base
      return await delay(ms, fn)
    } catch(e) {
      times++
    }
  }

  throw MAX_RETRY_TIMES_ERROR
}
