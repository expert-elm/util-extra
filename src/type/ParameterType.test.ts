import { walkTypes } from 'ts-baseline'
import * as path from 'path'
import * as fs from 'fs'

test(`should get function first argument type`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./ParameterType.ts`), 'utf8')}
    import { ParamterType } from './ParamterType
    type T = (a: string) => void
    type T1 = ParameterType<T>
    var foo: T1
  `)

  expect(out).toMatch(/>foo : string/)
})

test(`should get function the second argument type`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./ParameterType.ts`), 'utf8')}
    import { ParamterType } from './ParamterType
    type T = (a: string, b: number) => void
    type T1 = ParameterType<T, 1>
    var foo: T1
  `)

  expect(out).toMatch(/>foo : number/)
})
