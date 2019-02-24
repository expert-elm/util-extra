import toTimestamp from './toTimestamp'
import { ParameterType } from '../type/ParameterType'

/** ago flag */
type AgoFlag = [number, string]

/** hard code flags */
const flags: ReadonlyArray<AgoFlag> = [
  [31536e6, 'year'],
  [2592e6,  'month'],
  [6048e5,  'week'],
  [864e5,   'day'],
  [36e5,    'hour'],
  [6e4,     'min'],
  [1e3,     'sec']
]

/** default template string */
export const DEFAULT_TEMPLATE: string = '$1 $2 ago'
/** default justnow template string */
export const DEFAULT_JUSTNOW_TEMPLATE: string = 'just now'

/**
 * apply template function
 */
interface TemplateFunction {
  (number: number, description: string): ReturnType<typeof ago>
}

/**
 * compute date ago from now
 * 
 * @param date compare date
 * @param from from date
 * @param template output template string
 * @param justNowTemplate output just now template string
 */
export default function ago(date: ParameterType<typeof toTimestamp>, 
                            from?: typeof date,
                            template: string | TemplateFunction = DEFAULT_TEMPLATE,
                            justNowTemplate: string = DEFAULT_JUSTNOW_TEMPLATE): string {
  const compute: number = undefined === from ? Date.now() : toTimestamp(from)
  const target: number = toTimestamp(date)
  const diff: number = compute - target

  if(diff < 0) {
    throw new Error(`date should less then current timestamp`)
  }

  for(let i = 0; i < flags.length; i++) {
    const [ compare, desc ] = flags[i]
    if(diff / compare >= 1) {
      const num: number = diff / compare | 0
      const str: string = num > 1 ? num.toString() : 'a'
      const fmt: string = desc + (num > 1 ? 's' : '')
      if('function' === typeof template) return template(num, desc)
      return template.replace('$1', str).replace('$2', fmt)
    }
  }

  return justNowTemplate
}
