import wrapBy from './wrapBy'
import quoteBy from './quoteBy'
import { ParameterType } from '../type/ParameterType'

type Attributes = {
  [key: string]: string
}

/**
 * wrap string with tag and attributes
 * 
 * @param value string
 * @param tag xml tag
 * @param attrs attribute object
 */
export default function wrapByTag(value: string,
                                  tag: string = 'div',
                                  attrs?: Attributes): string {
  const fmtAttrs: string = undefined !== attrs && '' !== tag ? format(attrs) : ''
  const tags: ParameterType<typeof wrapBy, 1> = [`<${tag}${fmtAttrs}>`, `</${tag}>`]
  return wrapBy(value, tags)
}

/**
 * format attribute object to string
 * 
 * @param attrs attribute object
 */
function format(attrs: Attributes): string {
  const acc: string[] = []
  for (const key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      const value = attrs[key]
      acc.push(`${key}=${quoteBy(value)}`)
    }
  }  
  return ' ' + acc.join(' ')
}
