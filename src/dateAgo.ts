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
 * compute date ago from now
 * 
 * @param date compare date
 * @param from from date
 * @param template output template string
 * @param justNowTemplate output just now template string
 */
export default function dateAgo(date: Date | number | string, 
                                from?: Date | number | string | undefined,
                                template: string = DEFAULT_TEMPLATE,
                                justNowTemplate: string = DEFAULT_JUSTNOW_TEMPLATE): string {
  const compute: number = undefined === from ? Date.now() : transform(from)
  const target: number = transform(date)
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
      return template.replace('$1', str).replace('$2', fmt)
    }
  }

  return justNowTemplate
}

function transform(date: Date | number | string): number {
  return date instanceof Date ? date.getTime() : +new Date(date)
}
