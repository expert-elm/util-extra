import delay from './delay'
import { AnyFunction } from '../type/AnyFunction'

/** build-in timing function */
export const enum TimingFunction {
  /* change by steps */
  Step,
  /* linear, interval no changed */
  Linear,
  /* curve, fast forward then slow out */
  Curve
}

type TimingFunctions = {
  [K in TimingFunction]: TimingFunctionType
}

/** build-in timing function implements  */
export const TIMING_FUNCTION: TimingFunctions = {
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
export interface TimingFunctionType {
  (times: number, options: Options): number
}

/** retry options type */
export interface Options {
  /** basic interval, default to 1s */
  base: number,
  /** max retry times, default to 10 times */
  max: number
  /** timing function, use build-in or custom equation, default to linear */
  func: TimingFunction | TimingFunctionType
}

/** default retry options */
export const DEFAULT_OPTIONS: Options = {
  base: 1000,
  max: 10,
  func: TimingFunction.Linear
}

/** max retry times errors  */
export const MAX_RETRY_TIMES_ERROR: Error = new Error(`Maximum retry times`)

/**
 * retry function that not throw
 *  
 * @param fn caller
 * @param options retry options
 */
export default async function retry<F extends AnyFunction>(fn: F, options: Partial<Options> = {}): Promise<ReturnType<F>> {
  const opts: Options = { ...DEFAULT_OPTIONS, ...options }
  const { base, max, func } = opts

  let times: number = 0
  const equ: TimingFunctionType = 'function' === typeof func ? func : TIMING_FUNCTION[func]
  
  while(times < max) {    
    try {
      const dt = equ(times, opts)
      const ms: number = (dt + 1) * base
      return await delay(fn, ms)
    } catch(e) {
      times++
    }
  }

  throw MAX_RETRY_TIMES_ERROR
}
