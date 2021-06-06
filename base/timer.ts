import { AnyFunction } from './function'

/**
 * Sleep millseconds
 * 
 * @param timeout - sleep millseconds
 * @example ```ts
 * await sleep(100)
 * ```
 */
export function sleep(timeout: number): Promise<void> {
  if(timeout < 0) throw new Error(`timeout should greate then 0, got ${timeout}`)
  return new Promise(res => setTimeout(res, timeout))
}

/**
 * Function wrapper, call delay millseconds
 * 
 * @param fn - wrapp function
 * @param timeout - millseconds
 * @returns function
 * @example ```ts
 * const fn = () => 42
 * const delay_fn = delay(fn, 1000)
 * await delay_fn() // 42, will exec after one second
 * ```
 */
export function delay<F extends AnyFunction>(fn: F, timeout: number) {
  if(timeout < 0) throw new Error(`timeout should greate then 0, got ${timeout}`)
  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise(res => setTimeout(() => {
      res(fn(args))
    }, timeout))
  }
}

/**
 * Function wrapper, throw when overtime
 * 
 * @param fn - wrap function
 * @param timeout - millseconds
 * @throws timeout
 * @returns function
 * @example ```ts
 * const fn = () => 42
 * const timeout_fn = timeout(fn, 1000)
 * await timeout_fn() // 42
 * 
 * const fn = () => sleep(2000)
 * const timeout_fn = timeout(fn, 1000)
 * await timeout_fn() // throw Timeout
 * ```
 */
export function timeout<F extends AnyFunction>(fn: F, timeout: number) {
  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise((res, rej) => {
      const timer = setTimeout(cleanup, timeout)
      res(fn(...args))

      function cleanup() {
        clearTimeout(timer)
        rej(new Error('Timeout'))
      }
    })
  }
}




/** build-in timing function */
export const enum TimingFunction {
  /* change by steps */
  Step,
  /* linear, interval no changed */
  Linear,
  /* curve, fast forward then slow out */
  Curve
}

const TIMING_FUNCTION: { [K in TimingFunction]: ITimingFunction } = {
  [TimingFunction.Step]: a => {
    if(a <= 3) return 0
    else if(a <= 6) return 1
    else return 2
  },
  [TimingFunction.Linear]: a => a,
  [TimingFunction.Curve]: a => Math.log1p(a)
}

/** 
 * timing function type 
 * 
 * @param times current run times
 * @param options retry options
 */
export interface ITimingFunction {
  (times: number, options: Options): number
}

/** retry options type */
export interface Options {
  /** base interval, default to 1s */
  base?: number,
  /** timing function, use build-in or custom equation, default to `TimingFunction.Linear` */
  timing?: TimingFunction | ITimingFunction
}

/**
 * retry function that not throw
 *  
 * @param fn caller
 * @param options retry options
 */
export function retry_by_timer<F extends AnyFunction<R>, R>(fn: F, max: number = 10, options: Options = {}) {
  return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    const { 
      base = 1000, 
      timing = TimingFunction.Linear 
    } = options
    
    let times: number = 0
    const func: ITimingFunction = 'function' === typeof timing ? timing : TIMING_FUNCTION[timing]
    
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
