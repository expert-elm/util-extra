import { AnyFunction } from './function'

export function sleep(timeout: number): Promise<void> {
  return new Promise(res => setTimeout(res, timeout))
}

export function timeout<F extends AnyFunction>(fn: F, timeout: number) {
  return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise(async (res, rej) => {
      const timer = setTimeout(cleanup, timeout)
      res(await fn(...args))

      function cleanup() {
        clearTimeout(timer)
        rej(new Error('Timeout'))
      }
    })
  }
}

export function delay<F extends AnyFunction>(fn: F, timeout: number) {
  return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    await sleep(timeout)
    return await fn(...args)
  }
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
  /** base interval, default to 1s */
  base?: number,
  /** timing function, use build-in or custom equation, default to linear */
  timing?: TimingFunctionType | TimingFunction
}

/**
 * retry function that not throw
 *  
 * @param fn caller
 * @param options retry options
 */
export function retry<F extends AnyFunction<R>, R>(fn: F, max: number = 10, options: Options = {}) {
  return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    const { 
      base = 1000, 
      timing = TimingFunctionType.Linear 
    } = options
    
    let times: number = 0
    const func: TimingFunction = 'function' === typeof timing ? timing : TIMING_FUNCTION[timing]
    
    while(times < max) {    
      try {
        const dt = func(times, options)
        const ms: number = (dt + 1) * base
        return await delay(fn, ms)(...args)
      } catch(e) {
        times++
      }
    }

    throw new Error('Maximum retry times')
  }
}
