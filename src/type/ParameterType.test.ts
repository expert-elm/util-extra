import { walkTypes } from 'ts-baseline'
import * as path from 'path'
import * as fs from 'fs'

test(`should get function first argument type`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./ParameterType.ts`), 'utf8')}
    type F = (a: string) => void
    type T = ParameterType<F>
    var foo: T
  `)

  expect(out).toMatch(/>foo : string/)
})

test(`should get function the second argument type`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./ParameterType.ts`), 'utf8')}
    type F = (a: string, b: number) => void
    type T = ParameterType<F, 1>
    var foo: T
  `)

  expect(out).toMatch(/>foo : number/)
})
