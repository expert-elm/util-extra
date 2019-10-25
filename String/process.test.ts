import * as path from 'path'
import { 
  PairPattern,
  unwrap, 
  unwrapDeep,
  unquote,
  wrapPattern,
  wrapQuote,
  wrapXMLTag
} from './process'

const ns = path.basename(path.dirname(__filename))

describe(ns + ' word', () => {
  test('function ' + unwrap.name, () => {
    expect(unwrap('"foo"')).toBe('foo')
    expect(unwrap('{foo}')).toBe('foo')
    expect(unwrap('<foo > ')).toBe('<foo > ')
    expect(unwrap('@???@', { include: ['@@'] })).toBe('???')
    expect(unwrap('(foo)', { exclude: ['()'] })).toBe('(foo)')
    expect(unwrap('(foo)', { defaultPairs: false })).toBe('(foo)')
  })

  test('function ' + unwrapDeep.name, () => {
    expect(unwrapDeep('([{foo}])')).toBe('foo')
    expect(unwrapDeep('<foo>>')).toBe('foo>')
  })

  test('function ' + unquote.name, () => {
    expect(unquote('"foo"')).toBe('foo')
    expect(unquote('`foo`')).toBe('foo')
    expect(unquote('\'foo\'')).toBe('foo')
  })

  test('function ' + wrapPattern.name, () => {
    expect(wrapPattern('foo', PairPattern.AngleBrackets)).toBe('<foo>')
    expect(wrapPattern('foo', '@')).toBe('@foo@')
    expect(wrapPattern('foo', '!?')).toBe('!foo?')
  })

  test('function ' + wrapQuote.name, () => {
    expect(wrapQuote('foo')).toBe('"foo"')
    expect(wrapQuote('foo', PairPattern.SingleQuotes)).toBe("'foo'")
  })

  test('function ' + wrapXMLTag.name, () => {
    expect(wrapXMLTag('foo')).toBe('<div>foo</div>')
  })
})
