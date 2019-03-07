import delay from './delay'
import { AnyFunction } from '../type/AnyFunction'

export const enum TimingFunction {
  Step,
  Linear,
  Curve
}

type TimingFunctions = {
  [K in TimingFunction]: TimingFunctionType
}

export const TIMING_FUNCTION: TimingFunctions = {
  [TimingFunction.Step]: a => {
    if(a <= 3) return 0
    else if(a <= 6) return 1
    else return 2
  },
  [TimingFunction.Linear]: a => a,
  [TimingFunction.Curve]: a => Math.log1p(a)
}

export interface TimingFunctionType {
  (times: number, options: Options): number
}

export interface Options {
  base: number,
  max: number
  func: TimingFunction | TimingFunctionType
}

export const DEFAULT_OPTIONS: Options = {
  base: 1000,
  max: 10,
  func: TimingFunction.Linear
}

export const MAX_RETRY_TIMES_ERROR: Error = new Error(`Maximum retry times`)

export default async function retry<F extends AnyFunction>(fn: F, options: Partial<Options> = {}): Promise<ReturnType<F>> {
  const opts: Options = { ...DEFAULT_OPTIONS, ...options }
  const { base, max, func } = opts

  let times: number = 0
  const equ: TimingFunctionType = 'function' === typeof func ? func : TIMING_FUNCTION[func]
  
  while(times < max) {    
    try {
      const dt = equ(times, opts)
      const ms: number = (dt + 1) * base
      return await delay(ms, fn)
    } catch(e) {
      times++
    }
  }

  throw MAX_RETRY_TIMES_ERROR
}
